import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { formatVocabularyData, Vocabulary } from "../../../data";
import { COLORS } from "../../../utils/frontend";
import { CONSTANTS } from "../../../utils/main";
import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from "react-redux";
import { selectMainValues, update } from "../../../data/state/slices/mainSlice";
import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { useAppSelector } from "../../../data/state/hooksForTS";


//import json from '../../../vocab.json'


interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: number;
    value: number;
}

interface VocabularyCardProps {
    wordTypeIdx: number
}
export default function VocabularyCard({
    wordTypeIdx,
}: VocabularyCardProps) {

    const state = useSelector(selectMainValues),
        { analysis } = state
    const vocabulary: { [word_type: string]: Vocabulary } = analysis.vocabulary
    var data = formatVocabularyData(vocabulary)
    var pie_data = data.flatMap((el, i) => { return { "id": i, "label": el.type, "value": el.count } })
    const theme = useTheme();

    return (
        <div className="flex flex-col items-start justify-start w-full">
            {data.map((el, i) => {
                return (
                    <TabPanel
                        value={wordTypeIdx}
                        index={i}
                        dir={theme.direction}
                    >
                        <WordsList key={el.type} data={el} />
                    </TabPanel>
                )
            })}
        </div>
    )

}


function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            className="w-full"
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

interface WordsListProps {
    data: {
        type: string;
        count: number;
        words: {
            word: string;
            idxs: number[];
            count: number;
        }[];
        bgColor: string;
    }
}
/** Each block consists of a feature with usefull information. */
function WordsList({ ...props }: WordsListProps) {
    const { type, bgColor, words, count } = props.data
    const word_type_name = type
    const max_word_count = words[0].count
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
        list: {

        }
    }

    const dispatch = useDispatch()
    const text_to_highlight = useAppSelector(state => state.mainValues.text_to_highlight)

    return (
        <div
            className="flex flex-col items-start justify-start w-full"
            style={{ marginBottom: CONSTANTS.UI.PADDING_OUTER, paddingTop: 10 }}>
            <div className="flex items-start justify-between mb-2 w-full">
                <h4
                    role="button"
                    className={bgColor}
                    style={styles.title}
                >
                    {word_type_name}
                </h4>
                <p>{`Total: ${count}`}</p>
            </div>
            <ul className="w-full flex flex-col justify-start items-start">
                {words.map(w => {
                    const percentage = w.count / max_word_count
                    return (
                        <WordInfo
                            key={w.word}
                            word={w.word}
                            idxs={w.idxs}
                            count={w.count}
                            bgColor={bgColor}
                            percentage={percentage}
                            dispatch={dispatch}
                            text_to_highlight={text_to_highlight}
                        />
                    )
                })}
            </ul>
        </div>
    )
}

interface WordInfoProps {
    word: string
    idxs: number[]
    count: number
    bgColor: string
    percentage: number
    dispatch: Dispatch<AnyAction>
    text_to_highlight: string
}
function WordInfo({ word, idxs, count, bgColor,
    percentage, dispatch, text_to_highlight, }: WordInfoProps) {
    const [hovered, setHovered] = useState(false)
    const styles: { [key: string]: React.CSSProperties } = {
        box: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "start",
            paddingInline: CONSTANTS.UI.PADDING_INNER,
            paddingTop: CONSTANTS.UI.PADDING_INNER_SM,
            paddingBottom: CONSTANTS.UI.PADDING_INNER_SM,
            minWidth: 140,
            // cursor: "pointer",
        },
        title: {
            fontSize: "16px",
            fontWeight: "500",
        },
        barBox: {
            marginInline: CONSTANTS.UI.PADDING_INNER,
        },
        bar: {
            height: "10px",
            borderRadius: "2px",
            width: `calc(${100 * percentage}%)`
        }
    }
    const handleHover = () => {
        setHovered(true)
        dispatch(update({ key: "text_to_highlight", value: word }))
    }
    const handleStopHover = () => {
        setHovered(false)
        if (text_to_highlight === word)
            dispatch(update({ key: "text_to_highlight", value: "" }))
    }

    return (
        <li
            className="flex items-center justify-start w-full"
        >
            <div
                style={styles.box}
                onMouseOver={handleHover}
                onMouseLeave={handleStopHover}
            >
                <p className={hovered ? bgColor : ""}>{word}</p>
            </div>
            <div
                style={styles.barBox}
                className="flex items-center w-full"
            >
                <div
                    style={styles.bar}
                    className={hovered ? bgColor : "bg-cyan-300"}
                ></div>
            </div>
            <p
                className={hovered ? bgColor : ""}
                style={{
                    minWidth: 20,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
                onMouseOver={handleHover}
                onMouseLeave={handleStopHover}
            >{count}</p>
        </li>
    )
}
