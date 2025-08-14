from fastapi import FastAPI, UploadFile, HTTPException, Form
from fastapi.middleware.cors import CORSMiddleware
from typing import Dict
import os
import shutil
import uvicorn

from app.text_analyzer import NLP
from app.ai_services import LLM
from app.file_processor import FileProcessor
from app.models import (
    LexicalFields, KeyMetrics, KeyPoints,
    NoJargon, LearningTopics, Vocabulary, KeyPoint
)

app = FastAPI(
    title="Python API for Analyzing Documents", 
    description="Always learning", 
    version="0.0.1",
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
llm = LLM()


from pydantic import BaseModel

# Define the data structure expected in the request body
class TextRequest(BaseModel):
    text: str

@app.post("/get_lexical_fields", response_model=LexicalFields)
def lexical_fields_root(request: TextRequest):
    response = llm.get_lexical_fields(text=request.text)
    lexical_fields = KeyPoint.extract_points(response)
    return {"lexical_fields": lexical_fields, "text": response}

@app.post("/get_key_metrics", response_model=KeyMetrics)
async def key_metrics_root(request: TextRequest):
    key_metrics = llm.get_key_metrics(text=request.text)
    return key_metrics

@app.post("/get_key_points", response_model=KeyPoints)
async def key_points_root(request: TextRequest):
    response = llm.get_key_points(text=request.text)
    data = KeyPoint.extract_points(response)
    return {"key_points": data, "text": response}

@app.post("/get_vocabulary", response_model=Dict[str, Vocabulary])
async def get_vocabulary_root(request: TextRequest):
    nlp = NLP()
    response = nlp.get_keyword_positions(text=request.text)
    return response

@app.post("/remove_jargon", response_model=NoJargon)
async def remove_jargon_root(request: TextRequest):
    response = llm.remove_jargon(text=request.text)
    word_count = len(response.split())
    original_word_count = len(request.text.split())
    reduction = (original_word_count - word_count) / original_word_count * 100
    return {
        "text": response,
        "word_count": word_count,
        "original_word_count": original_word_count,
        "reduction": round(reduction)
    }

@app.post("/recommend_learning_topics", response_model=LearningTopics)
async def recommend_learning_topics_root(request: TextRequest):
    response = llm.recommend_learning_topics(text=request.text)
    data = KeyPoint.extract_points(response)
    return {"learning_topics": data, "text": response}


@app.post("/get_course_text")
async def get_course_text_root(course: UploadFile, param1: str = Form(...)) -> str:
    """Extracts text from the provided file."""
    try:
        file_path = f"uploads/{course.filename}"
        file_extension = os.path.splitext(file_path)[1]
        with open(file_path, "wb") as course_file:
            shutil.copyfileobj(course.file, course_file)

        text = ""    
        file_processor = FileProcessor()
        if file_extension == ".pdf":
            text = file_processor.read_pdf(file_path)
        elif file_extension in [".md", ".txt"]:
            text = file_processor.read_text_file(file_path)
        else:
            text = file_processor.transcribe_audio(file_path)

        os.remove(file_path)
        return text
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8080)
