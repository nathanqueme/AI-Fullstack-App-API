/**
 * mainValues.ts
 * version 1.0.0
 * 
 * Created on the 26/02/2023
 */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Service } from "../../../types";
import { KeyMetrics, KeyPoints, LexicalFields, 
    NoJargon, Vocabulary, LearningTopics } from "../../main";
import { RootState } from "../store";


export interface MainValuesInterface {
    course: string,
    previous_course: string, 
    analysis: {
        "lexical_fields": LexicalFields
        "key_metrics": KeyMetrics
        "key_points": KeyPoints
        "vocabulary": { [word_type: string]: Vocabulary }
        "no_jargon": NoJargon
        "recommended_topics": LearningTopics
        "links": string,
    }, 
    analysing: boolean,
    text_to_highlight: string,
    subpage: Service | undefined,
    interactive_card: boolean, 
}
// INITIAL VALUES
const initialState: MainValuesInterface = {
    course: "",
    previous_course: "", 
    analysis: {
        "lexical_fields": [] as any,
        "key_metrics": [] as any,
        "key_points": [] as any,
        "vocabulary": {},
        "no_jargon": [] as any,
        "recommended_topics": [] as any,
        "links": "",
    }, 
    analysing: false, 
    text_to_highlight: "",
    subpage: undefined,
    interactive_card: false, 
}

export const mainSlice = createSlice({
    name: 'mainSlice',
    initialState: initialState,
    reducers: {
        update(state, action: PayloadAction<{key: keyof MainValuesInterface, value: any}>) {
            const { key, value } = action.payload;
            (state as any)[key] = value;
        },
        updateAnalysisData: (state, action: PayloadAction<{service: Service, data: any}>) => {
            const { service, data } = action.payload;
            state.analysis[service] = data;
        },
    }
})



export const {
    update,
    updateAnalysisData, 
} = mainSlice.actions;

export default mainSlice.reducer;

// Selector
export const selectMainValues = (state: RootState) => state?.mainValues