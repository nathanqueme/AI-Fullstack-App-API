/**
* analytics.tsx
* version 1.0.0
* 
* Created on the 10/05/2023
* 
*/

import store from '../state/store'
import { analyticsConfig } from './analyticsConfig'
import { AnalyticsEventName } from './analyticsTypes'
import { isStringValid } from '../../utils/functions'
import { LocalStorageKey } from '../../types'
import { getTodayContentCreationCount, getTodayUploadCount } from './analyticsUtils'

const { LOGS } = analyticsConfig

// MOST ITEMS WILL INCLUDE THE FOLLOWING DATA: 
/** 
* {
*  "item_id": "story123",
*  "occured_at": "2022:03:12T23:32:32Z",
*  "actions": [...]
* }
*/
function trackEvent(event: AnalyticsEventName, data?: { [key: string]: any }, bypassGhostUserRestriction = false) {

    // PARAMS / GET DATA 
    var finalData = Object.assign({}, data)
    const { session_id } = store.getState().analyticsValues
    const { href: location } = window.location
    const userAgent = navigator.userAgent
    const navigator_languages = navigator.languages

    // FORMAT DATA 
    if (!isStringValid(finalData.occurred_at)) {
        const occurred_at = new Date().toISOString()
        finalData.occurred_at = occurred_at
    }
    // Called "sid" so that if strangers try to understand what it is
    // they may not. (small "obfuscation")
    finalData.sid = session_id
    finalData.location = location
    finalData.event = event
    // finalData.userAgent = userAgent
    // finalData.navigator_languages = navigator_languages

    if (LOGS) {
        finalData["development"] = true
        console.log(`👀 ${event} ${JSON.stringify(finalData)}`)
    }
    // if (!DISABLE_ANALYTICS) api.updateJSONOnLocalFile(finalData, "logs/analytics.json")
}

export const analytics = {
    trackSessionStart() {
        trackEvent("session-start")
    },
    trackSessionEnd() {
        const session_ended_at = new Date().toISOString()
        trackEvent("session-end", { occured_at: session_ended_at })
        // cache the info
        localStorage.setItem("__sph_gh67vhdJD90_lsat" as LocalStorageKey, session_ended_at)
    },
    trackStoryCreation(story: any) {
        const data = {story}
        trackEvent("uploaded-story", data)
        const { today_key, today_content_creation_count } = getTodayContentCreationCount()
        const today_value = `${today_key}#${today_content_creation_count + 1}`
        localStorage.setItem("__sph_gh67vhdJD90_tccc" as LocalStorageKey, today_value)
    }
}
