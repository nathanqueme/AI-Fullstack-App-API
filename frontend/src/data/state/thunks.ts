/**
 * store.ts
 * version 1.0.0
 * 
 * Created on the 09/05/2023
 * 
 * Thunks are components used many times in the code which handle : 
 * - interacting with the api to load data
 * - updating the data on redux
 */

import api from "../../backend"
import { Service } from "../../types"
import { update, updateAnalysisData } from "./slices/mainSlice"
import { AppDispatch, } from "./store"

// import { AppDispatch, RootState } from "./store"

// import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
// import { AppDispatch, RootState } from "./store";

// export type AppThunk<ReturnType = void> = ThunkAction<
//     ReturnType,
//     RootState,
//     unknown,
//     AnyAction
// >

// EXEMPLE
// export async function handleGetStories(dispatch: AppDispatch, getState: () => RootState, customProp: any) {
//     const { data } = getState().mainValues
//     dispatch(pushDataToRedux(data, customProp))
// }

async function analyseCourse(dispatch: AppDispatch,
    course: string) {
    dispatch(update({ key: "analysing", value: true }))
    var queue: Array<{ f: (text: string) => Promise<any>, s: Service }> = [
        { "f": api.getKeyMetrics, "s": "key_metrics" },
        { "f": api.getKeyPoints, "s": "key_points" },
        { "f": api.getLexicalFields, "s": "lexical_fields" },
        { "f": api.getVocabulary, "s": "vocabulary" },
        { "f": api.recommendLearningTopics, "s": "recommended_topics" },
        { "f": api.removeJargon, "s": "no_jargon" },
    ]
    await Promise.all(queue.map(async (el) => {
        try {
            const { f: getData, s: service } = el
            console.time(service)
            const data = await getData(course)
            dispatch(updateAnalysisData({ service, data  })) // update redux 
            console.timeEnd(service)
        } catch (error) { console.log(error) }
    }))
    // setLoading(false)
    dispatch(update({ key: "analysing", value: false }))
}


export { 
    analyseCourse
}