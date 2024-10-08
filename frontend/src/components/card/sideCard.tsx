/**
 * ====================================================
 * 
 * Created on the 27/10/2023
 * 
 * Copyright © 2023 Nathan Queme. All rights reserved.
 * 
 * ====================================================
 */


import React, { useState } from "react";
import { Spacer } from "../main";
import CONSTANTS from "../../utils/main/constants";
import { COLORS, STYLES } from "../../utils/frontend";
import ButtonCircle from "../buttons/buttonCircle";
import CourseInputCard from "./courseInput/courseInputCard";
import { NavigationEvent, Service } from "../../types";
import AnalysisCard from "./analysisCard";
import api from "../../backend";
import VocabularyCard from "./subpages/vocabularyCard";
import { getServiceShortName } from "../../data";

import VocabTabs from "../navigations/VocabTabs";
import { useDispatch, useSelector } from "react-redux";
import { selectMainValues, update } from "../../data/state/slices/mainSlice";
import { analyseCourse } from "../../data/state/thunks";
import { isDeviceMobile, isStringValid } from "../../utils/functions";
import InteractiveCard from "./interactiveCard";
import { IconButton } from "@mui/material";
import { MuiIcon } from "../main/Icons";

interface SideCardProps { }
export default function SideCard({ }: SideCardProps) {
    const [navEvent, setNavEvent] = useState<NavigationEvent[]>([]);
    const [loading, setLoading] = useState(false);
    // COURSE INPUT PAGE 
    // ---------------------->
    // option 1 (MIC)
    const [record, setRecord] = useState(false);
    const [recording, setRecording] = useState(false);
    const [playing, setPlaying] = React.useState(false);
    // option 2 (FILE)
    const [file, setFile] = useState<File | undefined>();
    // <----------------------
    // ANALYSIS PAGE
    // ---------------------->
    const [analysis, setAnalysis] = useState(false);
    // <----------------------
    // SUBPAGES
    // ---------------------->
    const [wordTypeIdx, setWordTypeIdx] = useState(0);
    // <----------------------
    const state = useSelector(selectMainValues),
        { previous_course, subpage, interactive_card
        } = state
    const mobile = isDeviceMobile()
    const hasFile = file !== undefined;
    const courseInputCard = record || hasFile;
    const homeCard = !courseInputCard && !subpage;
    const tabbar = subpage === "vocabulary"

    const styles: { [key: string]: React.CSSProperties } = {
        box: {
            minWidth: "340px",
            width: mobile ? "100%": undefined, 
            maxWidth: mobile ? "100%":"32%",
            paddingBottom: CONSTANTS.UI.PADDING_INNER,
        },
        header: {
            position: homeCard ? undefined : "sticky",
            top: -CONSTANTS.UI.HEADER_HEIGHT,
            paddingTop: CONSTANTS.UI.PADDING_INNER,
            paddingBottom: tabbar ? 0 : CONSTANTS.UI.PADDING_INNER,
            width: "100%",
            backgroundColor: COLORS.white,
            zIndex: 50,
        },
        paddingX: {
            paddingInline: CONSTANTS.UI.PADDING_INNER,
        },
        title: {
            fontSize: 24,
            fontWeight: "800",
            paddingBottom: CONSTANTS.UI.PADDING_INNER * 1.2,
        },
        comment: {
            ...STYLES.comment,
            maxWidth: "75%",
        },
        content: {
            paddingInline: CONSTANTS.UI.PADDING_INNER,
            paddingTop: CONSTANTS.UI.PADDING_OUTER,
        }
    }

    /** Sends events to childs which listen for new clicks. */
    const handleNavigationEvent = (event: NavigationEvent) => {
        setNavEvent(events => {
            return events.concat([event]);
        })
    }
    const closeSubpage = () => {
        dispatch(update({ key: "subpage", value: undefined }))
    }
    const resetToHomeCard = () => {
        setLoading(false)
        setRecord(false); setRecording(false)
        setFile(undefined)
        setAnalysis(false)
        closeSubpage()
        dispatch(update({ key: "course", value: "" }))
    }
    const handleGoBack = () => {
        setNavEvent([])
        if (subpage) {
            if (subpage === "vocabulary") {
                dispatch(update({ key: "interactive_card", value: false }))
                setTimeout(() => {  // scroll into vocab block
                    const el = document.getElementById("vocabulary" as Service); if (!el) return
                    el.scrollIntoView({ "behavior": "smooth", "block": "center", "inline": "center" })
                }, 300)
            }
            closeSubpage()
        } else if (analysis) {
            resetToHomeCard()
        } else handleNavigationEvent("go-back")
    }
    const dispatch = useDispatch()
    // MAIN APPLICATION LOGIC
    const handleGetCourseTextAndOpenAnalysisPage = async (blob: Blob, filename: string) => {
        // avoid re-analysing already analysed file

        setLoading(true)
        handleNavigationEvent("pause-audio")
        handleNavigationEvent("stop-recording")
        try {
            // 1. extract text 
            const text = await api.getCourseText("random-dummy", blob, filename);
            dispatch(update({ key: "course", value: text }))
            setLoading(false)
            // 2. Load the rest and switch to analysis page
            setAnalysis(true)
            if ((!isStringValid(previous_course)) || (previous_course != text)) { // avoid re-analysing same text
                analyseCourse(dispatch, text)
                dispatch(update({ key: "previous_course", value: text }))
            }
        } catch (error) {
            alert(error)
            setLoading(false)
        }
    }

    function getCardTitle() {
        // put last pages first
        if (subpage) return getServiceShortName(subpage)
        if (analysis) return loading ? "" : "Course analysis"
        if (record) return "Mic"
        if (hasFile) return "File selection"
        return ""
    }
    const cardTitle = getCardTitle()

    // https://stackoverflow.com/questions/26233180/resize-a-div-on-border-drag-and-drop-without-adding-extra-markup

    return (
        <div
            id="right_panel"
            className='fixed top-0 right-0 z-50 shadow-2xl flex flex-col items-start 
            justify-start min-h-screen max-h-screen overflow-y-scroll bg-white w-full
            '
            style={styles.box}
        >
            {(interactive_card && !mobile) &&
                <InteractiveCard />
            }
            <div id="card-head" />
            <div className={`${!homeCard ? "shadow" : ""} w-full`} style={styles.header}>
                <h1
                    className='w-2/3'
                    style={{ ...styles.title, ...styles.paddingX }}>
                    {CONSTANTS.APP_NAME}
                </h1>
                {homeCard ?
                    <p className="sitcky"
                        style={{ ...styles.comment, ...styles.paddingX }}>
                        {"Get help to understand a course by "}
                        <span
                            onClick={() => { handleNavigationEvent("open-record-page") }}
                            role={"button"}
                            className="underline hover:bg-blue-200">
                            {"recording it "}
                        </span>
                        {"or "}
                        <span
                            onClick={() => { handleNavigationEvent("click-file-selector") }}
                            role={"button"}
                            className="underline hover:bg-blue-200"
                        >{"uploading a file"}</span>
                        {"."}
                    </p>
                    :
                    <div className={"flex flex-col items-start justify-start w-full"}>
                        <div className={`flex items-center justify-between w-full`}
                            style={{ ...styles.paddingX }}
                        >
                            <div className={`flex items-center justify-start`}>
                                <ButtonCircle
                                    icon="arrow-left"
                                    onClick={handleGoBack}
                                />
                                {(!homeCard) &&
                                    <p className="ml-8 font-bold" style={styles.comment}>
                                        {cardTitle}
                                    </p>
                                }
                            </div>
                            {analysis &&
                                <div className="flex items-center justify-end">
                                    <IconButton onClick={() => {
                                        handleNavigationEvent("download-analysis")
                                    }}>
                                        <MuiIcon
                                            name={"download"}
                                            color={"rgb(100 116 139)"}
                                            fontSize={20}
                                        />
                                    </IconButton>
                                </div>
                            }
                            {(record && !analysis) &&
                                <div className="flex items-center justify-end">
                                    <ButtonCircle
                                        icon={recording ? "mic-off" : "mic"}
                                        iconSize={22}
                                        description={recording ? "Stop" : "Record"}
                                        onClick={() => {
                                            handleNavigationEvent(recording ? "stop-recording" :
                                                "start-recording")
                                        }}
                                    />
                                    <Spacer paddingSize="outer" />
                                    <ButtonCircle
                                        disabled={recording}
                                        icon={playing ? "pause" : "play"}
                                        iconSize={22}
                                        description={playing ? "Pause" : "Play"}
                                        onClick={() => {
                                            handleNavigationEvent(recording ? "pause-audio" :
                                                "play-audio")
                                        }}
                                    />
                                </div>
                            }
                        </div>
                        {tabbar &&
                            <VocabTabs
                                wordTypeIdx={wordTypeIdx}
                                setWordTypeIdx={setWordTypeIdx}
                            />
                        }
                    </div>
                }
            </div>

            <div
                className="w-full flex flex-col items-center justify-center"
                style={styles.content}
            >
                {(() => {
                    if (subpage) {
                        switch (subpage) {
                            case 'vocabulary': return (
                                <VocabularyCard
                                    wordTypeIdx={wordTypeIdx}
                                />)
                        }
                    } else if (analysis) {
                        return (
                            <AnalysisCard navEvent={navEvent} />
                        )
                    } else {
                        return (
                            <CourseInputCard
                                navEvent={navEvent}
                                loading={loading} setLoading={setLoading}
                                record={record} setRecord={setRecord}
                                recording={recording} setRecording={setRecording}
                                playing={playing} setPlaying={setPlaying}
                                file={file} setFile={setFile}
                                onClickContinue={handleGetCourseTextAndOpenAnalysisPage}
                            />
                        )
                    }
                })()}
            </div>
        </div>
    )
}