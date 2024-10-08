/**
 * navigation.ts
 * version 1.0.0
 * 
 * Created on the 09/05/2023
 */

import { Service } from "../types"

/** Services currently available, in the right order. */
export const services: Service[] = [
    "no_jargon",
    "key_metrics",
    "key_points",
    "lexical_fields",
    "vocabulary",
    "recommended_topics",
    "links",

]

export function getServiceShortName(service: Service) {
    var text = "";
    switch (service) {
        case "key_metrics":
            text = "Key metrics";
            break
        case "key_points":
            text = "Key points";
            break
        case "lexical_fields":
            text = "Lexical fields";
            break
        case "links":
            text = "Related links";
            break
        case "no_jargon":
            text = "No jargon";
            break
        case "recommended_topics":
            text = "Topics to learn";
            break
        case "vocabulary":
            text = "Vocabulary";
            break
    }
    return text
}

export function getServiceEmoji(service: Service) {
    var text = "";
    switch (service) {
        case "key_metrics":
            text = "🔍";
            break
        case "key_points":
            text = "☝️";
            break
        case "lexical_fields":
            text = "💬";
            break
        case "links":
            text = "🔗";
            break
        case "no_jargon":
            text = "🤏";
            break
        case "recommended_topics":
            text = "💁";
            break
        case "vocabulary":
            text = "📝";
            break
    }
    return text
}

/** filename: "course"  */
export const downloadTextFile = (data: string, filename: string) => {
    const blob = new Blob([data], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename.replace(".txt","")}.txt`;
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
};
