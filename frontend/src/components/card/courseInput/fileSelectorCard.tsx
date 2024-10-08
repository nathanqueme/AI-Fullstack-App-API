import { COLORS, STYLES } from "../../../utils/frontend"
import { getFileMetadata } from "../../../utils/functions"
import { CONSTANTS } from "../../../utils/main"
import ButtonContinue from "../../buttons/buttonContinue"
import { Spacer } from "../../main"

const tapeIcon = require("../../../assets/images/3dTapeIcon.png")

interface FileSelectorProps {
    file: File
    invalidFileType: boolean
    acceptedFiles: any
    loading: boolean
    onClickSelectFile: () => any
    onClickContinue: () => any
}
export default function FileSelectorCard({ file, invalidFileType, acceptedFiles,
    loading, onClickSelectFile, onClickContinue }: FileSelectorProps) {
    const { fileName, lastModified, fileSize } = getFileMetadata(file)
    const styles: { [name: string]: React.CSSProperties } = {
        box: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            alignItems: "start",
            // padding: CONSTANTS.UI.PADDING_INNER,
            width: "100%",
            maxWidth: "340px",
        },
        button: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "start",
            padding: CONSTANTS.UI.PADDING_INNER,
            backgroundColor: COLORS.lightGray,
            borderRadius: 12,
            width: "100%",
        },
        info: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            alignItems: "start",
        }
    }
    return (
        <div style={styles.box}>
            <div style={styles.button} role="button" onClick={onClickSelectFile}>
                <div style={styles.info}>
                    <p style={{ fontWeight: "500", fontSize: 16, lineHeight: "40px" }}>
                        {fileName}
                    </p>
                    <p style={STYLES.gray13Text}>{"Size: "}
                        <span style={STYLES.black14}>{fileSize}</span>
                    </p>
                    <p className='mt-1' style={STYLES.gray13Text}>{"Last modified: "}
                        <span style={STYLES.black14}>{lastModified}</span>
                    </p>
                    <span
                        className="underline"
                        style={{ color: COLORS.darkBlue, fontSize: 13, paddingTop: 10 }}
                    >
                        Change
                    </span>
                </div>
                <img
                    src={tapeIcon}
                    width={"80px"}
                    height={"80px"}
                    className={"object-contain self-center"}
                />
            </div>
            <div className="flex flex-col items-center justify-center w-full">
                <Spacer paddingSize="outer" />
                <ButtonContinue
                    disabled={invalidFileType}
                    onClick={onClickContinue}
                    loading={loading}
                />
            </div>
            {invalidFileType &&
                <div className="flex flex-col w-full items-start justify-start">
                    <AcceptedFilesInfo
                        invalidFileType={invalidFileType}
                        acceptedFiles={acceptedFiles}
                    />
                </div>
            }
        </div>
    )
}

export function AcceptedFilesInfo({ invalidFileType, acceptedFiles }:
    { invalidFileType: boolean, acceptedFiles: string }) {
    const errorTextStyle = { ...STYLES.red13ErrorText, ...{ marginBottom: 6 } }
    return (
        <div style={{ padding: 10, textAlign: "left" }}>
            {invalidFileType &&
                <p className='text-left' style={errorTextStyle}>
                    {"Invalid file type"}
                </p>
            }
            <p
                className="italic"
                style={{
                    color: invalidFileType ? COLORS.red : "gray",
                    fontSize: 12,
                    maxWidth: "80%"
                }}
            >
                {`Accepts: ${acceptedFiles}`}</p>
        </div>
    )
}