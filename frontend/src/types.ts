/**
 * types.ts
 * version 1.0.0
 * 
 * Created on the 09/05/2023
 */

export type NavigationPageNameType =
    "home"
export type LocalStorageKey =
    // "sph" stands for "SpreadHub"
    // "gh67vhdJD90" is a random ID, used for making the key harder to understand for strangers/people 
    // "lsat" stands for "Last session at"
    "__sph_gh67vhdJD90_lsat" |
    // "tuc" stands for "Today upload count"
    "__sph_gh67vhdJD90_tuc" |
    // "tccc" stands for "Today content creation count"
    "__sph_gh67vhdJD90_tccc"
export type NavigationEvent =
    "open-record-page" |
    "click-file-selector" |
    "go-back" |
    "stop-recording" |
    "start-recording" |
    "pause-audio" |
    "play-audio" | 
    "download-analysis"
export type Service = "lexical_fields" |
    "key_metrics" |
    "key_points" |
    "vocabulary" |
    "no_jargon" |
    "recommended_topics" |
    "links"