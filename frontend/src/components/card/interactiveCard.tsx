/**
 * ====================================================
 * 
 * Created on the 27/10/2023
 * 
 * Copyright © 2023 Nathan Queme. All rights reserved.
 * 
 * ====================================================
 */


import React from "react";
import CONSTANTS from "../../utils/main/constants";
import { COLORS, STYLES } from "../../utils/frontend";
import ButtonCircle from "../buttons/buttonCircle";
import { useSelector } from "react-redux";
import { useAppDispatch, } from "../../data/state/hooksForTS";
import { selectMainValues, update } from "../../data/state/slices/mainSlice";
import { isStringValid } from "../../utils/functions";



interface InteractiveCardProps { }
export default function InteractiveCard({ }: InteractiveCardProps) {

    const styles: { [key: string]: React.CSSProperties } = {
        box: {
            maxWidth: "32%",
            paddingBottom: CONSTANTS.UI.PADDING_INNER,
            right: window.screen.width * 32 / 100,
        },
        header: {
            position: "sticky",
            top: -CONSTANTS.UI.HEADER_HEIGHT,
            paddingTop: CONSTANTS.UI.PADDING_INNER,
            paddingBottom: CONSTANTS.UI.PADDING_INNER,
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
            paddingInline: CONSTANTS.UI.PADDING_INNER * 1.5,
            paddingTop: CONSTANTS.UI.PADDING_OUTER,
        }
    }

    const state = useSelector(selectMainValues),
        { text_to_highlight, course } = state
    const highlight = isStringValid(text_to_highlight)
    const cardTitle = highlight ? text_to_highlight : "Hover text to highlight"// "Interactive text"



    const handleScreenshot = () => {

    }
    const dispatch = useAppDispatch()
    function handleCloseCard() {
        dispatch(update({ key: "interactive_card", value: false }))
    }

    return (
        <div
            id="interactive-card"
            className='fixed top-0 z-50 shadow-2xl flex flex-col items-start 
            justify-start min-h-screen max-h-screen overflow-y-scroll bg-white w-full
            border-r
            '
            style={styles.box}
        >
            <div id="interactive-card-head" />
            <div className={`${"shadow"} w-full`} style={styles.header}>
                <div className={"flex flex-col items-start justify-start w-full"}>
                    <div className={`flex items-center justify-between w-full`}
                        style={{ ...styles.paddingX }}
                    >
                        <div className={`flex flex-1 items-center justify-start`}>
                            <ButtonCircle
                                icon="close"
                                onClick={handleCloseCard}
                            />
                            <p
                                className={`ml-8 font-bold`}
                                style={styles.comment}>
                                {cardTitle}
                            </p>
                        </div>
                        {false &&
                            <div className="flex items-center justify-end">
                                <ButtonCircle
                                    icon={"camera"}
                                    iconSize={22}
                                    // description={"Screenshot"}
                                    onClick={handleScreenshot}
                                />
                            </div>
                        }
                    </div>
                </div>
            </div>

            <div
                className="w-full flex flex-col items-start justify-start"
                style={styles.content}
            >
                <p>
                    {course.split(" ").map(string => {
                        const highlightMe = highlight &&
                            string.includes(text_to_highlight)
                        return (
                            <span>
                                <span className={highlightMe ? "bg-yellow-200" : ""}>
                                    {string}
                                </span>
                                {" "}
                            </span>
                        )
                    })}
                </p>
            </div>
        </div>
    )
}
