import { Skeleton } from "@mui/lab";
import { Button, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    downloadTextFile,
    formatVocabularyData,
    keyPointsToStrings,
} from "../../data";
import { selectMainValues, update } from "../../data/state/slices/mainSlice";
import { NavigationEvent, Service } from "../../types";
import { COLORS } from "../../utils/frontend";
import { isStringValid } from "../../utils/functions";
import { CONSTANTS } from "../../utils/main";
import { MuiIcon } from "../main/Icons";

interface AnalysisCardProps {
    navEvent: NavigationEvent[]
}
export default function AnalysisCard({ navEvent }: AnalysisCardProps) {

    const state = useSelector(selectMainValues),
        { analysis, analysing, course } = state

    const { no_jargon } = analysis
    const key_metrics = (analysis.key_metrics.key_metrics ?? []).
        flatMap(el => { return el.simplified })
    const lexical_fields = keyPointsToStrings(analysis.lexical_fields.lexical_fields)
    const key_points = keyPointsToStrings(analysis.key_points.key_points, true)
    const recommended_topics = keyPointsToStrings(analysis.recommended_topics.learning_topics)
    var vocabulary = formatVocabularyData(analysis.vocabulary)
    const vocabulary_descriptions = vocabulary.flatMap(el => { return `${el.count} ${el.type}` })
    // const [links, setLinks] = useState<{ url: string, image: string, text: string, source: string }[]>();

    const dispatch = useDispatch()
    const handleOpenVocabularyCard = () => {
        dispatch(update({ key: "subpage", value: "vocabulary" }))
        dispatch(update({ key: "interactive_card", value: true }))
    }

    useEffect(() => {
        if (navEvent.length == 0) return
        if (navEvent[navEvent.length - 1] == "download-analysis") {
            var text = `



No jargon: 
${no_jargon.text}




Metrics: 
${key_metrics.join("\n")}




Important points: 
${key_points.join("\n")}




Lexical fields: 
${lexical_fields.join("\n")}




Vocabulary:
${vocabulary_descriptions.join("\n")}




Recommended topics to learn:
${recommended_topics.join("\n")}




`
            downloadTextFile(text, `course_analysis.txt`)
        }
    }, [navEvent])

    if (analysing) {
        return (
            <div className="flex flex-col items-start justify-start w-full">
                <p className="self-center mb-6 mt-2">{"Analysing..."}</p>
                <Skeleton
                    height={240} width={"100%"} animation="wave"
                    sx={{ borderRadius: "14px", marginTop: "-40px", opacity: 0.7 }}
                />
                <Skeleton
                    height={40} width={"100%"} animation="wave"
                    sx={{ borderRadius: "8px", opacity: 0.7 }}
                />
                <Skeleton
                    height={40} width={"40%"} animation="wave"
                    sx={{ borderRadius: "8px", opacity: 0.7 }}
                />
            </div>
        )
    } else {
        return (
            <div className="flex flex-col items-start justify-start w-full">
                <FeatureBlock
                    id="no_jargon"
                    emoji={"🤏"}
                    title={"Summary"}
                    titleBgColor={"bg-yellow-200"}
                    comment={`${no_jargon.reduction}% shorter (${no_jargon.original_word_count - no_jargon.word_count} words removed out of ${no_jargon.original_word_count})`}
                    text={no_jargon.text}
                    originalText={course}
                />
                <FeatureBlock
                    id="key_metrics"
                    emoji={"🔢"}
                    title={"Metrics"}
                    titleBgColor={"bg-red-200"}
                    comment={(key_metrics.length > 0) ? `${key_metrics.length} key metrics` : ""}
                    text={key_metrics.join("\n\n")}
                />
                <FeatureBlock
                    id="key_points"
                    emoji={"☝️"}
                    title={"Important points"}
                    titleBgColor={"bg-blue-200"}
                    comment={(key_points.length > 0) ? `${key_points.length} key points` : ""}
                    text={key_points.join("\n\n")}
                />
                <FeatureBlock
                    // Idea: people could type a lexical field and ask to higlight all words
                    // using the interactive card and then take a screenshot of it.
                    id="lexical_fields"
                    emoji={"💬"}
                    title={"Lexical fields"}
                    titleBgColor={"bg-purple-200"}
                    comment={(lexical_fields.length > 0) ? `${lexical_fields.length} lexical fields` : ""}
                    text={lexical_fields.join("\n\n")}
                />
                <FeatureBlock
                    id="vocabulary"
                    emoji={"📝"}
                    title={"Vocabulary"}
                    titleBgColor={"bg-green-200"}
                    comment=""//={`Word family sorted by frequency.`}
                    text={vocabulary_descriptions.join("\n")}
                    onClickButton={handleOpenVocabularyCard}
                    buttonText={"See all words"}
                />
                <FeatureBlock
                    id="recommended_topics"
                    emoji={"💁"}
                    title={"Recommended topics to learn"}
                    titleBgColor={"bg-orange-200"}
                    comment={(recommended_topics.length > 0) ? `${recommended_topics.length} topics` : ""}
                    text={recommended_topics.join("\n")}
                />
                {/*
                <FeatureBlock
                    id="links"
                    emoji={"🔗"}
                    title={"Related links"}
                    titleBgColor={"bg-cyan-200"}
                    comment={`3 links`}
                    text={"https://www.domain.com"}
                />
                */}
            </div>
        )
    }
}

interface FeatureBlockProps {
    id: Service
    emoji: string
    title: string
    comment: string
    text: string
    originalText?: string
    titleBgColor: string
    onClickButton?: () => any
    buttonText?: string
}
/** Each block consists of a feature with usefull information. */
function FeatureBlock({ id, emoji, title, comment, text,
    originalText, titleBgColor, onClickButton, buttonText, }: FeatureBlockProps) {

    const [showOriginal, setShowOriginal] = useState(false);
    const [expand, setExpand] = useState(false);

    const hasOriginalText = isStringValid(originalText);
    const styles: { [key: string]: React.CSSProperties } = {
        title: {
            fontSize: "16",
            fontWeight: "600",
            color: COLORS.black,
            lineHeight: "28px",
            paddingInline: 8,
            // paddingTop: 7, 
            // paddingBottom: 7,
        },
        emoji: {
            paddingLeft: 4,
            fontSize: 28,
            paddingRight: CONSTANTS.UI.PADDING_INNER,
        }
    }

    const handleCopy = () => {
        const el = document.getElementById(`${id}-text`),
            infoEl = document.getElementById(`${id}-comment`)
            ; if (!el || !infoEl) return
        navigator.clipboard.writeText(el.innerText)
        infoEl.innerText = "Copied!"
        var originalColor = infoEl.style.color
        infoEl.style.color = COLORS.darkBlue
        setTimeout(() => { infoEl.innerText = comment; infoEl.style.color = originalColor }, 1500)
    }
    const handleChangeText = () => {
        setShowOriginal(!showOriginal)
    }
    const changeDimension = () => {
        const el = document.getElementById(id); if (!el) return
        if (expand) el.scrollIntoView({ "behavior": "smooth", "block": "center", "inline": "center" })
        setExpand(!expand)
    }

    return (
        <div
            id={id}
            className="flex flex-col items-start justify-start w-full"
            style={{ marginBottom: CONSTANTS.UI.PADDING_OUTER, paddingTop: 10 }}>
            <div className="flex items-center justify-center mb-2">
                <p className="mr-2" style={styles.emoji}>{emoji}</p>
                <h4 role="button" className={titleBgColor} style={styles.title}
                    onClick={changeDimension}
                >
                    {title}
                </h4>
            </div>
            <div className="rounded-lg w-full"
                style={{ backgroundColor: COLORS.lightGray }}>
                <p id={`${id}-text`}
                    className="overflow-clip py-2 px-4 mb-4 whitespace-pre-line"
                    style={{ maxHeight: expand ? undefined : 144 }}
                >
                    {showOriginal ? originalText : text}
                </p>
                <div className="flex w-full border-t border-slate-300">
                    <p id={`${id}-comment`}
                        className="pt-2 px-4 underline text-slate-500"
                        style={{ fontSize: 13 }}>
                        {comment}
                    </p>
                </div>
                <div className="flex items-center pt-2 justify-between ml-4 mr-2 mb-2">
                    {hasOriginalText ?
                        <button onClick={handleChangeText} className="flex">
                            <p
                                className="text-slate-500"
                                style={{ fontSize: 13 }}>
                                {showOriginal ? `Show modified` : `Show original`}
                            </p>
                        </button>
                        :
                        onClickButton ?
                            <Button
                                variant="contained"
                                size="small"
                                endIcon={
                                    <MuiIcon name="arrow-up-right" color="white" />
                                }
                                onClick={onClickButton}
                                disableElevation
                            >
                                {buttonText ?? "More info"}
                            </Button>
                            :
                            <div />
                    }
                    <div className="flex items-end justify-around">
                        <IconButton onClick={handleCopy}>
                            <MuiIcon
                                name={"copy"}
                                color={"rgb(100 116 139)"}
                                fontSize={20}
                            />
                        </IconButton>
                        <IconButton onClick={changeDimension}>
                            <MuiIcon
                                name={expand ? "minimize" : "expand"}
                                color={"rgb(100 116 139)"}
                                fontSize={20}
                            />
                        </IconButton>
                    </div>
                </div>
            </div>
        </div>
    )
}
