/**
 * sofiaApi.ts
 * version 1.0.0
 * 
 * Created on the 2/10/2023
 */

import axios from "axios";
import {
    KeyMetrics, KeyPoints, LearningTopics,
    LexicalFields, Vocabulary, NoJargon
} from "../data";

const URL = process.env.NODE_ENV === "production" ?
    `https://sofia-api-7vplfzivba-zf.a.run.app/api/v1` :
    `http://localhost:8080`;

export var API_ENDPOINTS = {
    GET_COURSE_TEXT: `${URL}/get_course_text`,
    GET_LEXICAL_FIELDS: `${URL}/get_lexical_fields`,
    GET_KEY_METRICS: `${URL}/get_key_metrics`,
    GET_KEY_POINTS: `${URL}/get_key_points`,
    GET_VOCABULARY: `${URL}/get_vocabulary`,
    REMOVE_JARGON: `${URL}/remove_jargon`,
    RECOMMEND_TOPICS: `${URL}/recommend_learning_topics`,
    DEV: {
        VOCAB: `${URL}/dev/vocab`,
        NUMBERS: `${URL}/dev/numbers`
    }
};

const botHeaders = {
    headers: {
        "Authorization": `Bearer ${process.env.REACT_APP_MINIPIXBOT_SECRET}`
    }
};

export async function post(endpoint: string, data: { [key: string]: any }) {
    const response = await axios.post(endpoint, data, { ...botHeaders });
    const output = response.data;
    return output;
}

export async function getCourseText(param1: string, file: Blob, filename: string) {
    var formData = new FormData();
    formData.append("course", file, filename);
    formData.append("param1", param1);

    const response = await axios.post(API_ENDPOINTS.GET_COURSE_TEXT, formData, {
        headers: {
            "Authorization": botHeaders.headers.Authorization,
            "Content-Type": 'multipart/form-data',
        }
    });
    const output = response.data as string;
    return output;
}

export async function getLexicalFields(text: string) {
    const response = await post(API_ENDPOINTS.GET_LEXICAL_FIELDS, { text });
    return response as LexicalFields;
}

export async function getKeyMetrics(text: string) {
    const response = await post(API_ENDPOINTS.GET_KEY_METRICS, { text });
    return response as KeyMetrics;
}

export async function getKeyPoints(text: string) {
    const response = await post(API_ENDPOINTS.GET_KEY_POINTS, { text });
    return response as KeyPoints;
}

export async function getVocabulary(text: string) {
    const response = await post(API_ENDPOINTS.GET_VOCABULARY, { text });
    return response as { [word_type: string]: Vocabulary };
}

export async function removeJargon(text: string) {
    const response = await post(API_ENDPOINTS.REMOVE_JARGON, { text });
    return response as NoJargon;
}

export async function recommendLearningTopics(text: string) {
    const response = await post(API_ENDPOINTS.RECOMMEND_TOPICS, { text });
    return response as LearningTopics;
}
