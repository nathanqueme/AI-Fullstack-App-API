import openai
import PyPDF2
from config import CONFIG

class FileProcessor:
    def __init__(self):
        openai.api_key = CONFIG["OPENAI"]["API_KEY"]

    # Speech-to-Text
    def transcribe_audio(self, audio_path: str, options=None):
        """
        Transcribes audio to text using OpenAI's Whisper model.

        Args:
            audio_path (str): The path to the audio file.
            options (dict, optional): Additional options like 'hl' (language) and 'temperature'.

        Returns:
            str: Transcribed text from the audio file.
        """
        try:
            params = {
                "model": "whisper-1",
                "response_format": "json",
                "language": None,
                "temperature": None,
            }

            if options:
                if "hl" in options:
                    params["language"] = options["hl"]
                if "temperature" in options:
                    params["temperature"] = options["temperature"]

            with open(audio_path, "rb") as audio_file:
                transcription = openai.Audio.transcribe(file=audio_file, **params)
                return transcription["text"]
        except Exception as e:
            raise e

    # Text-to-Text
    def read_pdf(self, file_path: str):
        """
        Reads text from a PDF file.

        Args:
            file_path (str): The path to the PDF file.

        Returns:
            str: Extracted text from the PDF file.
        """
        try:
            reader = PyPDF2.PdfReader(file_path)
            pages = reader.pages

            text = ""
            for page in pages:
                page_text = page.extract_text().strip()
                text += page_text + "\n"

            return text
        except Exception as e:
            print(f"Error: {e}")
            return None

    # Text-to-Text
    def read_text_file(self, file_path: str):
        """
        Reads text from a plain text file (txt, md, or rtf).

        Args:
            file_path (str): The path to the text file.

        Returns:
            str: Content of the text file.
        """
        try:
            with open(file_path, 'r', encoding='utf-8') as txt_file:
                txt_content = txt_file.read()
                return txt_content
        except Exception as e:
            print(f"Error: {e}")
            return None

    # Image-to-Text
    def image_to_text(self):
        """
        Placeholder for future implementation of image-to-text processing.
        """
        pass
