/**
 * mainValues.ts
 * version 1.0.0
 * 
 * Created on the 08/04/2023
 */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { getSessionID } from '../../../utils/functions/main'
import { LocalStorageKey } from "../../../types";


export interface AnalyticsValuesInterface {
    session_id: string
    last_session_ended_at: string
    today_upload_count: number
    today_content_creation_count: number
}
// INITIAL VALUES
var initialState: AnalyticsValuesInterface = {
    session_id: getSessionID(),
    last_session_ended_at: localStorage.getItem("__sph_gh67vhdJD90_lsat" as LocalStorageKey) || new Date().toISOString(), // 2021-04-08T12:00:00.000Z
    today_upload_count: 0,
    today_content_creation_count: 0,
}

// PAYLOADS 
export interface setAnalyticsValuePayload {
    key: keyof AnalyticsValuesInterface
    value: any
}

export const analyticsSlice = createSlice({
    name: 'analyticsSlice',
    initialState: initialState,
    reducers: {
        setAnalyticsValue: (state: any, action: PayloadAction<setAnalyticsValuePayload>) => {

            // Values 
            const { key, value } = action.payload;

            // Updates
            state[key] = value;
        },
        incrementTodayUploadCount: (state: any) => {
            state.today_upload_count += 1 
        }
    }
})

export const { setAnalyticsValue, incrementTodayUploadCount } = analyticsSlice.actions;

export default analyticsSlice.reducer;

// Selector
export const selectAnalyticsValues = (state: RootState) => state?.analyticsValues
