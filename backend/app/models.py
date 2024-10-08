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
    def extract_points(text: str):
        """Extracts points from text. 

        e.g. "Lexical Fields: \n\n1. Nature: flowers, grass, sky\n2: Colors: Blue, Green, Red"
        => Will output a list of points dict containing their: 
        - key: 1.
        - name: 1
        - idx: 123
        - end_idx: 200
        - text: "Nature: flowers, grass, sky"
        """
        # "\n- "
        pattern = r'(\n?-\s?[0-9A-Z]+\.\s)'  # '(\n?[0-9A-Z]+)\.' # '\n[0-9A-Z]+\.'
        point_keys = re.findall(pattern, text)
        points_len = len(point_keys)
        points = []
        for key in point_keys:
            idx = text.find(key)
            points.append({"key": key, "idx": idx})
        for i, point in enumerate(points):
            idx = point["idx"]
            key = point["key"]
            next_idx = points[i+1]["idx"] if i+1 < points_len else len(text)
            point = KeyPoint(name=key.replace("\n", "").replace("-", "").replace(".", "").strip(), 
                              key=key, 
                              text=text[point["idx"]+len(key):next_idx].strip(), 
                              idx=idx, 
                              end_idx=next_idx)
            points[i] = vars(point) # vars(point) # dict object for non python 
        return points

    def toString(self) -> str:
        text = """\nname: {name}\ntext: {text}\n---  """
        return text.format(name=self.name, text=self.text)
    
    @staticmethod
    def getExemples(self):
        text = "\n-1. Total Addressable Market (TAM 3.2 ) \n- 2. Power Sellers \n -3. eBay \n - 4. PayPal \n-5. Fortress \n-6. Talented Team \n-7. Base Center Point \n-8. Intuition \n-9. Payments \n-10. Expansion Capability"
        text3 = "1. Total addressable market (TAM) is an important component when starting a company (fake point 3.3).\n2. Having a large TAM can be problematic as it can obfuscate other important questions.\n3. The restaurant business has an enormous TAM, but can be a terrible business to go into.\n4. It is important to have a tight, narrow TAM for the initial market.\n5. It is possible to gain a foothold and build a fortress in a small TAM.\n6. Expansion capabilities can be based on the talent of the team and the importance of the center point.\n7. Intuition can help identify ways to expand from a base."
        text2 = "Lexical Fields:\n\n1. AI: Artificial Intelligence, Breakthrough, Data Nerds\n2. Business: Company, Total Addressable Market, Competition, Niche, Narratives, Power Sellers, Market Share, Fortress, Expansion, Commodified\n3. Technology: Internet, PayPal, Facebook, Palantir, Founders Fund\n4. People: Peter Thiel, Orin, Team, Intuition\n5. Society: Society, Lockdown, COVID, Years, Real AI Wave\n6. Finance: Sell, eBay, Payments, Share, Radical Expansion"
        return self.extract_points(text)


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
