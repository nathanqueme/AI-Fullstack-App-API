import re

class NLP:
    def __init__(self):
        import spacy
        self.nlp = spacy.load("en_core_web_sm")

    # @deprecated => modifies string e.g. 20,000.78 becomes 20000.78
    def get_numbers_using_regex(self, text: str):
        pattern = r'(\$\s?\d+(?:,\d{3})*(?:\.\d+)?%?|%\s?\d+(?:,\d{3})*(?:\.\d+)?|\d+(?:,\d{3})*(?:\.\d+)?%?)'
        matches = re.findall(pattern, text)
        numbers = [match.replace(',', '') for match in matches]
        return numbers
    
    def parse_text_numbers(self, text: str):
        doc = self.nlp(text)
        tokens = [token for token in doc if token.like_num]
        numbers = [{"idx": token.idx, "text": token.text} for token in tokens] 
        return numbers

    def get_sentences_with_numbers(self, text: str):
        doc = self.nlp(text)
        sentences = list(doc.sents)
        sentences_with_numbers = []
        for sentence in sentences: 
            stc_text = sentence.text
            stc_idx = text.index(stc_text)
            stc_numbers = self.parse_text_numbers(stc_text)
            if len(stc_numbers):
                for i, num in enumerate(stc_numbers):
                    idx = num["idx"] + stc_idx # From sentence idx to text idx
                    stc_numbers[i] = {"text": num["text"], "idx": idx }
                
                data = {"text": stc_text, "numbers": stc_numbers, "idx": idx }
                if len(stc_numbers) > 0:
                    sentences_with_numbers.append(data)
        
        return sentences_with_numbers
    
    def get_vocab(self, text: str):
        doc = self.nlp(text)
        words = [{"text": token.text, "pos_": token.pos_, "idx": token.idx} 
                    # https://universaldependencies.org/u/pos/
                    for token in doc if token.pos_ in ['NOUN', 'ADJ', 'ADP', 'ADV', 'VERB', 'PROPN']
                    ]
        return words

    def search_similar_words(self, text: str, word: str):
        doc = self.nlp(text)
        w1 = self.nlp(word)
        words = []
        for token in doc:
            text = token.text
            w2 = self.nlp(text)
            similarity = w1.similarity(w2)
            if similarity > 0.5:
                data = { "text": text, "idx": token.idx, "similarity": similarity, "pos_": token.pos_ }
                words.append(data)
                words.sort(key=lambda x: x["similarity"], reverse=True)
        return words

    def get_parent_sentences(self, word: dict, text: str):
        doc = self.nlp(text)
        sentences = list(doc.sents)  
        found_sentences = [sentence.text for sentence in sentences if word["text"] in sentence.text]
        return found_sentences

    # idea UI: 
    # vertical tabbar (sorted by count after 1st) [VOCAB/LEXICAL FIELDS]  [NOUNS]  [ADJECTIVES]... 
    # when clicked horizontally: list of words sorted by count
    def get_keyword_positions(self, text: str):
        doc = self.nlp(text)
        words = {}
        for token in doc: 
            pos_, text, idx = token.pos_, token.text, token.idx
        
            if pos_ not in words:
                words[pos_] = { "count": 0, "words": {} }
            
            if text not in words[pos_]["words"]:
                words[pos_]["words"][text] = [idx]
            else: 
                words[pos_]["words"][text].append(idx)
                
            words[pos_]["count"] += 1
        
        words = dict(sorted(words.items(), key=lambda x: x[1]["count"], reverse=True))
        return words
