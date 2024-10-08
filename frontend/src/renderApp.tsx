/**
 * ====================================================
 * 
 * Created on the 27/10/2023
 * 
 * Copyright © 2023 Nathan Queme. All rights reserved.
 * 
 * ====================================================
 */


import React from 'react'
import './utils/frontend/App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
// PAGES
import { HomeDashboard } from './navigation'
import { analytics, getTodayContentCreationCount, getTodayUploadCount } from './data/analytics'
import { useAppDispatch } from './data/state/hooksForTS'
import { setAnalyticsValue } from './data/state/slices/analyticsSlice'


function DesktopsAndTabletsWebApp() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<HomeDashboard key="home" />} />
                <Route path='*' element={<p>404 ERROR</p>} />
            </Routes>
        </BrowserRouter>
    )
}

function RenderApp() {

    // ANALYTICS
    const dispatch = useAppDispatch()
    React.useEffect(() => {
        function initialize() {
            analytics.trackSessionStart()
            function handleSessionEnd() {
                analytics.trackSessionEnd()
            }
            window.addEventListener('beforeunload', handleSessionEnd);
            const { today_upload_count } = getTodayUploadCount()
            const { today_content_creation_count } = getTodayContentCreationCount()
            dispatch(setAnalyticsValue({ key: "today_upload_count", value: today_upload_count }))
            dispatch(setAnalyticsValue({ key: "today_content_creation_count", value: today_content_creation_count }))
        }
        initialize()
    }, []);

    return <DesktopsAndTabletsWebApp />
}

export default RenderApp