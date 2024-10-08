import { LoadingButton } from "@mui/lab"
import { COLORS } from "../../utils/frontend"

export default function ButtonContinue({ onClick, loading = false, disabled = false }:
    { onClick: () => any, loading?: boolean, disabled?: boolean }) {
    const styles = {
        text: {
            fontSize: "600",
            color: COLORS.white,
            opacity: loading ? 0 : 1
        }
    }
    return (
        <LoadingButton
            loading={loading}
            disabled={disabled}
            variant="contained"
            disableElevation sx={{ borderRadius: 99999 }}
            className=" rounded-full" onClick={onClick}
        >
            <span style={styles.text}>
                {`${disabled ? "❌" : "✅"} Continue`}
            </span>
        </LoadingButton>
    )
}