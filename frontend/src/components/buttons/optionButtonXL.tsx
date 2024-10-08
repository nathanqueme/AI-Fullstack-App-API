import { COLORS, STYLES } from "../../utils/frontend"
import { isDeviceMobile } from "../../utils/functions"
import { CONSTANTS } from "../../utils/main"

interface OptionButtonXLProps {
    name: string
    description: string
    image: string
    bottom?: JSX.Element | JSX.Element[]
    onCLick: () => any
}
export default function OptionButtonXL({ name, description, 
    image, bottom, onCLick }: OptionButtonXLProps) {
    const styles: { [name: string]: React.CSSProperties } = {
        box: {
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "start",
            width: "100%",
            maxWidth: 300,
        },
        button: {
            backgroundColor: COLORS.lightGray,
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            paddingInline: 28,
            borderRadius: 12,
            paddingTop: CONSTANTS.UI.PADDING_INNER * 1.5,
            paddingBottom: CONSTANTS.UI.PADDING_INNER * 1.5,
            width: "100%",
            cursor: "pointer",
        },
        title: {
            fontSize: 21,
            fontWeight: "800",
            lineHeight: "34px",
        },
        caption: {
            ...STYLES.comment,
        }
    }
    const mobile = isDeviceMobile()
    const imageSize = mobile ? 100: window.screen.width * 0.32 * 0.23
    return (
        <div style={styles.box}>
            <div
                className="hover:brightness-90"
                style={styles.button}
                onClick={onCLick}
                role="button"
            >
                <div
                    className="flex justify-center self-center items-center"
                    style={{ marginBottom: CONSTANTS.UI.PADDING_INNER, }}
                >
                    <img
                        src={image}
                        width={imageSize}
                        // height={"100%"}
                        className={"object-contain self-center"}
                    />
                </div>

                <div className="">
                    <h2 style={styles.title}>{name}</h2>
                    <p style={styles.caption}>{description}</p>
                </div>
            </div>
            {bottom && bottom}
        </div>
    )
}