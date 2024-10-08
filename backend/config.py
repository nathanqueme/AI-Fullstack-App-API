import os
from dotenv import load_dotenv

load_dotenv(dotenv_path='.env', override=True)

CONFIG = {
    "OPENAI": {
        "API_KEY": os.getenv("OPENAI_API_KEY"),
        "LIST_FORMAT_PROMPT": 'List item format: "- 1. "', 
    }
}
 