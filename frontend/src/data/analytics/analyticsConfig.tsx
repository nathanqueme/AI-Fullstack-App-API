/**
 * analyticsConfig.tsx
 * version 1.0.0
 * 
 * Created on the 07/05/2023
 */

const production = process.env.NODE_ENV === "production"
const disableAnalyticsLogs = false

export const analyticsConfig = {
    /** WHEN ENABLED EVENTS WON'T BE SAVED */
    DISABLE_ANALYTICS: false, 
    /** DISABLED DURING PROD MODE */
    LOGS: !production && !disableAnalyticsLogs,
}