import re
import spacy
from typing import List, Dict, Any

class NLP:
    def __init__(self):
        self.nlp = spacy.load("en_core_web_sm")

    def get_numbers_using_regex(self, text: str) -> List[str]:
        pattern = r'(\$\s?\d+(?:,\d{3})*(?:\.\d+)?%?|%\s?\d+(?:,\d{3})*(?:\.\d+)?|\d+(?:,\d{3})*(?:\.\d+)?%?)'
        matches = re.findall(pattern, text)
        return [match.replace(',', '') for match in matches]
    
    def parse_text_numbers(self, text: str) -> List[Dict[str, Any]]:
        doc = self.nlp(text)
        tokens = [token for token in doc if token.like_num]
        return [{"idx": token.idx, "text": token.text} for token in tokens]

    def get_sentences_with_numbers(self, text: str) -> List[Dict[str, Any]]:
        doc = self.nlp(text)
        sentences = list(doc.sents)
        sentences_with_numbers = []
        for sentence in sentences: 
            sentence_text = sentence.text
            sentence_idx = text.index(sentence_text)
            sentence_numbers = self.parse_text_numbers(sentence_text)
            if sentence_numbers:
                for i, num in enumerate(sentence_numbers):
                    idx = num["idx"] + sentence_idx
                    sentence_numbers[i] = {"text": num["text"], "idx": idx}
                
                data = {"text": sentence_text, "numbers": sentence_numbers, "idx": sentence_idx}
                sentences_with_numbers.append(data)
        
        return sentences_with_numbers
    
    def get_vocab(self, text: str) -> List[Dict[str, Any]]:
        doc = self.nlp(text)
        return [{"text": token.text, "pos_": token.pos_, "idx": token.idx} 
                for token in doc if token.pos_ in ['NOUN', 'ADJ', 'ADP', 'ADV', 'VERB', 'PROPN']]

    def search_similar_words(self, text: str, word: str) -> List[Dict[str, Any]]:
        doc = self.nlp(text)
        word_doc = self.nlp(word)
        words = []
        for token in doc:
            token_text = token.text
            token_doc = self.nlp(token_text)
            similarity = word_doc.similarity(token_doc)
            if similarity > 0.5:
                words.append({
                    "text": token_text, 
                    "idx": token.idx, 
                    "similarity": similarity, 
                    "pos_": token.pos_
                })
        return sorted(words, key=lambda x: x["similarity"], reverse=True)

    def get_parent_sentences(self, word: Dict[str, Any], text: str) -> List[str]:
        doc = self.nlp(text)
        sentences = list(doc.sents)  
        return [sentence.text for sentence in sentences if word["text"] in sentence.text]

    def get_keyword_positions(self, text: str) -> Dict[str, Any]:
        doc = self.nlp(text)
        words = {}
        for token in doc: 
            pos_, token_text, idx = token.pos_, token.text, token.idx
        
            if pos_ not in words:
                words[pos_] = {"count": 0, "words": {}}
            
            if token_text not in words[pos_]["words"]:
                words[pos_]["words"][token_text] = [idx]
            else: 
                words[pos_]["words"][token_text].append(idx)
                
            words[pos_]["count"] += 1
        
        return dict(sorted(words.items(), key=lambda x: x[1]["count"], reverse=True))
