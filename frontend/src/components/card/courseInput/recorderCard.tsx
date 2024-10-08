import dayjs from "dayjs"
import React from "react"
import { STYLES } from "../../../utils/frontend"
import { COLORS, CONSTANTS } from "../../../utils/main"
import ButtonContinue from "../../buttons/buttonContinue"
import { Spacer } from "../../main"
import { MuiIcon } from "../../main/Icons"
const handMicIcon = require("../../../assets/images/3dHandMicIcon.png")

var localizedFormat = require('dayjs/plugin/localizedFormat')
dayjs.extend(localizedFormat)


interface RecorderCardProps {
    loading: boolean
    recording: boolean
    startedRecAt: Date
    audioDuration: number
    playingProgress: number
    onClickContinue: () => any
    onClickDonwload: () => any
}
export default function RecorderCard({ loading, recording, startedRecAt,
    audioDuration, playingProgress, onClickContinue, onClickDonwload }: RecorderCardProps) {
    const styles: { [name: string]: React.CSSProperties } = {
        box: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "start",
            padding: CONSTANTS.UI.PADDING_INNER,
            backgroundColor: COLORS.lightGray,
            borderRadius: 12,
            width: "100%",
            maxWidth: "340px",
        },
        info: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            alignItems: "start",
        },
        blueText: {
            color: COLORS.darkBlue,
            fontSize: 12, fontWeight: "600",
        }
    }
    const HL = "en"
    function displayDuration(durationInSeconds: number) {
        // Calculate hours, minutes, and seconds from the duration in seconds
        const hours = Math.floor(durationInSeconds / 3600);
        const minutes = Math.floor((durationInSeconds % 3600) / 60);
        const seconds = durationInSeconds % 60;

        // Format the duration using Day.js and adapt the format conditionally
        let formattedDuration;
        if (hours >= 1) {
            formattedDuration = dayjs()
                .hour(hours)
                .minute(minutes)
                .format(`HH[h] mm[m]`);
        } else {
            formattedDuration = dayjs()
                .minute(minutes)
                .second(seconds)
                .format(`mm:ss ${minutes > 0 ? "[min]" : "[sec]"}`);
        }
        return formattedDuration
    }
    const startedAt = dayjs(startedRecAt).locale(HL).format('LT')
    const duration = displayDuration(audioDuration)

    return (
        <div className="flex flex-col items-center justify-center w-full ">
            <div className="relative overflow-clip" style={styles.box}>
                <div style={styles.info}>
                    <p style={{ fontWeight: "500", fontSize: 16, lineHeight: "40px" }}>
                        {`New course audio`}
                    </p>
                    <p style={STYLES.gray13Text}>{"Started recording at: "}
                        <span style={STYLES.black14}>{startedAt}</span>
                    </p>
                    <p className='mt-1' style={STYLES.gray13Text}>{"Duration: "}
                        <span style={STYLES.black14}>{duration}</span>
                    </p>
                    <div
                        className="flex items-center justify-center"
                        style={{ paddingTop: 12 }}
                    >{recording ?
                        <React.Fragment>
                            <div
                                className="audio-player-anim"
                                style={{
                                    paddingRight: CONSTANTS.UI.PADDING_INNER_SM,
                                }}
                            >
                                <div className="bar bar-1"></div>
                                <div className="bar bar-3"></div>
                                <div className="bar bar-2"></div>
                            </div>
                            <p style={styles.blueText}>
                                {"Recording..."}
                            </p>
                        </React.Fragment>
                        :
                        <React.Fragment>
                            <button
                                className="flex items-center justify-start"
                                style={{ height: "40px" }}
                                onClick={onClickDonwload}>
                                <MuiIcon
                                    name="download"
                                    fontSize={22}
                                    color={COLORS.darkBlue}
                                />
                                <p className="ml-2" style={styles.blueText}>
                                    {"Download"}
                                </p>
                            </button>
                        </React.Fragment>
                        }
                    </div>
                </div>
                <img
                    src={handMicIcon}
                    width={"80px"}
                    height={"80px"}
                    className={"object-contain self-center"}
                />
                <div
                    className="rounded-full h-1 bg-blue-600 absolute bottom-0 left-0"
                    style={{ width: `calc(${100 * playingProgress}%)` }}
                ></div>
            </div>

            <Spacer paddingSize="outer" />
            {!recording &&
                <ButtonContinue
                    onClick={onClickContinue}
                    loading={loading}
                    disabled={loading} />
            }
        </div>
    )
}