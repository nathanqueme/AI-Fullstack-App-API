/**
 * Data.ts
 * version 1.0.0
 * 
 * Created on the 09/05/2023
 */

export function keyPointsToStrings(arr: KeyPoint[], just_text = false) {
    if ((typeof arr !== "object") || (arr === undefined)
        || (arr === null) || (arr.length == 0)) return []
    if (just_text) return arr.map(el => {
        return el?.text ?? ""
    })
    return arr.flatMap(el => {
        const key_point = new KeyPoint(el?.name, el?.key, el?.text, el?.idx, el?.end_idx)
        return key_point.toString()
    })
}

export function formatVocabularyData(vocab: { [word_type: string]: Vocabulary }) {
    var data = Object.keys(vocab).flatMap(type => {

        var words = vocab[type]["words"]
        var word_data = Object.keys(words).map(word => {
            const idxs = words[word]
            const count = idxs.length
            return { word, idxs, count }
        }).sort((a, b) => b.count - a.count)

        return {
            type: type,
            count: vocab[type]["count"],
            words: word_data,
            bgColor: "bg-green-200",
        }
    })
    return data
}

export class KeyPoint {
    name: string;
    key: string;
    text: string;
    idx: number;
    end_idx: number;
    constructor(name: string, key: string, text: string,
        idx: number, end_idx: number) {
        this.name = name;
        this.key = key;
        this.text = text;
        this.idx = idx;
        this.end_idx = end_idx;

    }

    toString() {
        var text = `${this.name}. ${this.text}`
        return text;
    }
}


export class LexicalFields {
    lexical_fields: KeyPoint[];
    text: string;
    constructor(lexical_fields: Array<KeyPoint>, text: string) {
        this.lexical_fields = lexical_fields;
        this.text = text;
    }
}

export class TextIdxDict {
    text: string;
    idx: number;
    constructor(text: string, idx: number) {
        this.text = text;
        this.idx = idx;
    }
}

export class KeyMetricSentence {
    text: string;
    numbers: Array<TextIdxDict>;
    idx: number;
    simplified: string;
    constructor(text: string, numbers: Array<TextIdxDict>,
        idx: number, simplified: string) {
        this.text = text;
        this.numbers = numbers;
        this.idx = idx;
        this.simplified = simplified;
    }
}

export class KeyMetrics {
    key_metrics: Array<KeyMetricSentence>;
    sentences: string[];
    constructor(key_metrics: Array<KeyMetricSentence>, sentences: string[]) {
        this.key_metrics = key_metrics;
        this.sentences = sentences;

    }
}

export class KeyPoints {
    key_points: Array<KeyPoint>;
    text: string;
    constructor(key_points: Array<KeyPoint>, text: string) {
        this.key_points = key_points;
        this.text = text;
    }
}

export class Vocabulary {
    count: number;
    words: { [word: string]: number[] };
    constructor(count: number, words: { [word: string]: number[] }) {
        this.count = count;
        this.words = words;
    }
}

export class NoJargon {
    text: string;
    word_count: number;
    original_word_count: number;
    reduction: number;
    constructor(text: string, word_count: number,
        original_word_count: number, reduction: number) {
        this.text = text;
        this.word_count = word_count;
        this.original_word_count = original_word_count;
        this.reduction = reduction;
    }
}

export class LearningTopics {
    learning_topics: Array<KeyPoint>;
    text: string;
    constructor(learning_topics: Array<KeyPoint>, text: string) {
        this.learning_topics = learning_topics;
        this.text = text;
    }
}
