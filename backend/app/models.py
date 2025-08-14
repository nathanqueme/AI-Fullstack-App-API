# Pydantic models for the backend API.

import re
from pydantic import BaseModel
from typing import List, Dict

class KeyPoint(BaseModel):
    """exemple:
    ```
    {
      "name": "7",
      "key": "\\n- 7. ",
      "text": "eBay: \"power sellers on eBay\", \"off eBay\", \"eBay growing\"",
      "idx": 414,
      "end_idx": 477
    }
    ```
    """
    name: str
    key: str 
    text: str
    idx: int
    end_idx: int
    
    @staticmethod
    def extract_points(text: str) -> List['KeyPoint']:
        """Extracts points from text like '1. Point content' or '- A. Point content'"""
        pattern = r'(\n?-?\s?[0-9A-Z]+\.\s)'
        
        point_matches = []
        for match in re.finditer(pattern, text):
            point_matches.append({
                'marker': match.group(1),
                'start_idx': match.start(),
                'content_start': match.end()
            })
        
        if not point_matches:
            return []
        
        key_points = []
        for i, match in enumerate(point_matches):
            end_idx = (point_matches[i + 1]['start_idx'] 
                      if i + 1 < len(point_matches) 
                      else len(text))
            
            content = text[match['content_start']:end_idx].strip()
            name = KeyPoint._clean_marker(match['marker'])
            
            key_points.append(KeyPoint(
                name=name,
                key=match['marker'],
                text=content,
                idx=match['start_idx'],
                end_idx=end_idx
            ))
        
        return key_points

    @staticmethod
    def _clean_marker(marker: str) -> str:
        return marker.replace('\n', '').replace('-', '').replace('.', '').strip()

class LexicalFields(BaseModel):
    lexical_fields: List[KeyPoint]
    text: str

class TextIdxDict(BaseModel): 
    text: str
    idx: int
    
class KeyMetricSentence(BaseModel):
    text: str
    numbers: List[TextIdxDict]
    idx: int
    simplified: str
    
class KeyMetrics(BaseModel):
    key_metrics: List[KeyMetricSentence]
    sentences: List[str]
    pass

class KeyPoints(BaseModel):
    key_points: List[KeyPoint]
    text: str

class Vocabulary(BaseModel):
    count: int
    words: Dict[str, List[int]]
    
class NoJargon(BaseModel): 
    text: str
    word_count: int
    original_word_count: int
    reduction: int

class LearningTopics(BaseModel):
    learning_topics: List[KeyPoint]
    text: str
