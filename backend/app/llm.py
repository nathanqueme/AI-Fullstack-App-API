from openai import OpenAI
from app.nlp import NLP
from config import CONFIG


class LLM:
    def __init__(self):
        self.client = OpenAI(api_key=CONFIG["OPENAI"]["API_KEY"])
        self.list_format = CONFIG["OPENAI"]["LIST_FORMAT_PROMPT"]
        self.nlp = NLP()

    # Information extraction + Summarization
    def get_lexical_fields(self, text: str) -> str:
        """
        Extracts and lists the most important lexical fields 
        and their corresponding words.
        """
        words = [w["text"] for w in self.nlp.get_vocab(text)]
        words_string = " ".join(words)
        prompt = f"""
        List the most important lexical fields and their exact words. 
        \n{self.list_format} e.g. Nature: - 1. Nature: trees, flowers, grass.
        \nText: {words_string}"""
        
        completion = self.client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "You are an assistant that summarizes and extracts key information."},
                {"role": "user", "content": prompt}
            ]
        )
        lexical_field = completion.choices[0].message.content.strip()
        return lexical_field

    # Knowledge extraction + Summarization
    def get_key_metrics(self, text: str):
        """
        Extracts key metrics by summarizing sentences 
        with numbers and simplifying them.
        """
        key_metrics = self.nlp.get_sentences_with_numbers(text)
        for i, stc in enumerate(key_metrics):
            stc_text = stc["text"]
            numbers = "|".join([num["text"] for num in stc["numbers"]])
            prompt = f"""Shorten this sentence by removing as many words except numbers ({
                numbers}), the context and what they refer to. \nSentence: {stc_text}"""
            
            completion = self.client.chat.completions.create(
                model="gpt-4",
                messages=[
                    {"role": "system", "content": "You are an assistant that summarizes key information."},
                    {"role": "user", "content": prompt}
                ]
            )
            simplified = completion.choices[0].message.content.strip().replace("\n", "")
            key_metrics[i]["simplified"] = simplified

        sentences = [stc["simplified"] for stc in key_metrics]
        return {"key_metrics": key_metrics, "sentences": sentences}

    # Knowledge extraction + Summarization
    def get_key_points(self, text: str) -> str:
        """
        Summarizes the key points and knowledge from the text.
        """
        prompt = f"""List knowledge we can learn from the key points. \n{self.list_format}\nText: {text}"""
        
        completion = self.client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "You are an assistant that extracts and summarizes key points."},
                {"role": "user", "content": prompt}
            ]
        )
        key_points = completion.choices[0].message.content.strip()
        return key_points

    # Summarization
    def remove_jargon(self, text: str) -> str:
        """
        Removes jargon, stuttering, and unnecessary repetitions from the text.
        """
        prompt = f"""Remove jargon as well as forms of stuttering and unnecessary repetitions. \nText: {text}"""
        
        completion = self.client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "You are an assistant that simplifies text."},
                {"role": "user", "content": prompt}
            ]
        )
        clean_text = completion.choices[0].message.content.strip()
        return clean_text

    # Recommendation
    def recommend_learning_topics(self, text: str) -> str:
        """
        Recommends important topics to learn based on the text.
        """
        prompt = f"""List by importance information we should pay attention to and learn.\n{self.list_format}\nText: {text}"""
        
        completion = self.client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "You are an assistant that recommends key topics for learning."},
                {"role": "user", "content": prompt}
            ]
        )
        topics = completion.choices[0].message.content.strip()
        return topics
