import { COLORS, CONSTANTS } from "../../utils/main"

export function LargeGraySeperator({ }) {
    const { UI: { PADDING_OUTER: outer_padding } } = CONSTANTS
    const styles = {
        main: {
            backgroundColor: COLORS.lightGray,
            marginTop: outer_padding,
            marginBottom: outer_padding,
        }
    }

    return (<div className="flex flex-col h-10 w-full rounded-lg" style={styles.main} />)
}