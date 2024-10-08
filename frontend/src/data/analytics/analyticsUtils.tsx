/**
 * analyticsUtils.tsx
 * version 1.0.0
 * 
 * Created on the 11/06/2023
 */

import { LocalStorageKey } from "../../types"

export function getTodayUploadCount() {
    const year = new Date().getUTCFullYear()
    const month = new Date().getUTCMonth() + 1
    const day = new Date().getUTCDate()
    const today_key = `${year}-${month}-${day}`

    try {
        const today_upload_count_string = localStorage.getItem("__sph_gh67vhdJD90_tuc" as LocalStorageKey) ?? null
        const parts = today_upload_count_string?.split("#") ?? []
        const today_upload_count = (parts.length > 2) || (parts[0] !== today_key) ? 0 : parseInt(parts[1])
        return { today_key, today_upload_count }
    } catch (error) {
        return { today_key, today_upload_count: 0 }
    }
}

export function getTodayContentCreationCount() {
    const year = new Date().getUTCFullYear()
    const month = new Date().getUTCMonth() + 1
    const day = new Date().getUTCDate()
    const today_key = `${year}-${month}-${day}`

    try {
        const today_content_creation_count_string = localStorage.getItem("__sph_gh67vhdJD90_tccc" as LocalStorageKey) ?? null
        const parts = today_content_creation_count_string?.split("#") ?? []
        const today_content_creation_count = (parts.length > 2) || (parts[0] !== today_key) ? 0 : parseInt(parts[1])
        return { today_key, today_content_creation_count }
    } catch (error) {
        return { today_key, today_content_creation_count: 0 }
    }
}