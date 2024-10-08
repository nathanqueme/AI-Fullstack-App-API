import { COLORS } from "../../utils/frontend"
import { CONSTANTS } from "../../utils/main"
import { IconName, MuiIcon } from "../main/Icons"


interface ButtonCircleProps {
    onClick: () => any
    icon: IconName
    iconSize?: number
    large?: boolean
    description?: string
    descriptionOnRight?: boolean
    bgColor?: string
    disabled?: boolean
}
export default function ButtonCircle({ onClick, icon, iconSize, description,
    descriptionOnRight, large = false, bgColor = COLORS.lightGray,
    disabled = false }: ButtonCircleProps) {
    const size = large ? 56 : 48;
    const button = <button
        disabled={disabled}
        className={`rounded-full overflow-clip flex items-center 
            justify-center ${disabled ? "" : "hover:brightness-90"}`}
        style={{ width: size, height: size, 
            backgroundColor: bgColor, 
            opacity: disabled ? 0.5 : 1 }}
        onClick={onClick}
    >
        <MuiIcon name={icon} color={COLORS.black} fontSize={iconSize} />
    </button>
    if (description) {
        return (
            <div
                className={`flex ${descriptionOnRight ? "" : "flex-col"} 
            items-center justify-center`}
            >
                {button}
                {description &&
                    <p style={{
                        color: COLORS.black,
                        fontSize: 14,
                        fontWeight: "500",
                        opacity: disabled ? 0.3 : 1,
                        paddingTop: descriptionOnRight ? 0 : CONSTANTS.UI.PADDING_MINI,
                        paddingLeft: descriptionOnRight ? CONSTANTS.UI.PADDING_MINI : 0
                    }}>{description}</p>
                }
            </div>
        )
    }
    return (button)
}