<div align="center">
  <img src="media/stack/stack.png" alt="Tech Stack" width="600"/>
</div>

# Document Processing AI App - Created in October 2023

A FastAPI-based document analysis system that processes university content through LLM and NLP pipelines. The API handles multiple file formats (PDF, audio, video, text) and runs parallel AI analysis to extract key insights. Includes a React web interface for file upload and interactive analysis visualization.

Built the entire backend from scratch with custom file processing, dockerized deployment, and a polished frontend with real-time features like browser audio recording and interactive text highlighting.

## Table of Contents
1. [API Architecture](#1-api-architecture)
2. [What I Built vs Libraries](#2-what-i-built-vs-libraries) 
3. [Demo](#3-demo)
4. [Frontend Implementation](#4-frontend-implementation)
5. [Code Navigation](#5-code-navigation)

## 1. API Architecture

The core of this project is a FastAPI backend that orchestrates multiple AI services to analyze educational content. The system processes any document type and runs parallel analysis through different AI models.

### File Processing Pipeline
The API handles multimodal input through a universal file processor. When you upload a file, it detects the format and routes it through the appropriate extraction method: PyPDF2 for PDFs, OpenAI Whisper for audio/video, or direct reading for text files. See [`file_processor.py`](backend/app/file_processor.py) and the upload endpoint in [`main.py`](backend/main.py#L80-L102).

### AI Analysis Engine  
Once text is extracted, the system runs six different AI analyses in parallel. The [`LLM` class](backend/app/ai_services.py) handles GPT-4 interactions for content summarization, jargon removal, and learning recommendations. The [`NLP` class](backend/app/text_analyzer.py) uses spaCy for linguistic analysis, vocabulary extraction, and numerical data identification. The parallel processing is coordinated through [`thunks.ts`](frontend/src/data/state/thunks.ts#L35-L57).

### Structured Data Models
All API responses use custom Pydantic models with regex parsing to extract structured data from LLM outputs. The [`KeyPoint` model](backend/app/models.py#L25-L58) automatically parses numbered lists from GPT-4 responses into structured objects with text positioning data.

<img src="media/api_endpoints.png" alt="API Documentation" width="400"/>

## 2. What I Built vs Libraries

**Custom**: File processing pipeline, AI service orchestration, NLP analysis, Pydantic data models, WebRTC audio recording, interactive text highlighting, Redux state management.

**Libraries**: FastAPI, OpenAI API, spaCy, PyPDF2, React, TailwindCSS.

## 3. Demo

![Main App UI](media/demo.gif)

The user uploads a document, the API processes it through multiple AI services, and the frontend displays organized analysis results with interactive features.

## 4. Frontend Implementation

### Audio Recording System
Built a browser-based recording interface using WebRTC MediaRecorder API. Users can record lectures directly in the app with real-time duration tracking and playback controls. The system handles blob collection and provides download functionality.

<img src="media/record_lecture.png" alt="Audio Recording Feature" width="340"/>

Code: [`courseInputCard.tsx`](frontend/src/components/card/courseInput/courseInputCard.tsx#L73-L140)

### File Upload Interface  
Created a drag-and-drop file selector with MIME type validation and metadata display. Supports multiple formats and provides user feedback for invalid files.

<img src="media/main_app.png" alt="Interactive components" width="340"/>

Code: [`fileSelectorCard.tsx`](frontend/src/components/card/courseInput/fileSelectorCard.tsx)

### Interactive Text Highlighting
Developed a real-time highlighting system where hovering over vocabulary words dynamically highlights them in the original document. Uses Redux state management to coordinate between components.

<img src="media/vocabulary_analysis.png" alt="Interactive UI" width="400"/>

Code: [`vocabularyCard.tsx`](frontend/src/components/card/subpages/vocabularyCard.tsx#L184-L192), [`interactiveCard.tsx`](frontend/src/components/card/interactiveCard.tsx#L119-L131)

## 5. Code Navigation

### Backend
**Main API**: [`main.py`](backend/main.py) - FastAPI app with endpoints  
**AI Services**: [`ai_services.py`](backend/app/ai_services.py) - GPT-4 integration  
**File Processing**: [`file_processor.py`](backend/app/file_processor.py) - Multimodal text extraction  
**NLP Pipeline**: [`text_analyzer.py`](backend/app/text_analyzer.py) - spaCy processing  
**Data Models**: [`models.py`](backend/app/models.py) - Pydantic schemas  

### Frontend  
**Main App**: [`renderApp.tsx`](frontend/src/renderApp.tsx) - Entry point  
**State Management**: [`mainSlice.tsx`](frontend/src/data/state/slices/mainSlice.tsx) - Redux store  
**API Client**: [`api.ts`](frontend/src/backend/api.ts) - HTTP requests  
**Audio Recording**: [`courseInputCard.tsx`](frontend/src/components/card/courseInput/courseInputCard.tsx) - WebRTC implementation  
**Text Highlighting**: [`vocabularyCard.tsx`](frontend/src/components/card/subpages/vocabularyCard.tsx) - Interactive features
