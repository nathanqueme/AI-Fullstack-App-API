/**
 * DashboardMainContainer.tsx
 * version 1.0.0
 * 
 * Created on the 07/03/2023
 */

import CONSTANTS from '../../utils/main/constants'

const { HEADER_HEIGHT: app_header_height } = CONSTANTS.UI

interface DashboardMainContainerInterface {
    children: any
    fullWidth?: boolean
    centerHorizontally?: boolean
    maxWidth?: string | number
}
function DashboardMainContainer({ children, fullWidth, centerHorizontally = false, maxWidth = "880px" }: DashboardMainContainerInterface) {
    // UI
    const mainContainerStyle = {
        width: "100%",
        maxWidth: fullWidth ? "100%" : maxWidth,
        paddingTop: app_header_height,
        // lot of spacing so it does not looks too empty for now
        paddingLeft: app_header_height,
        paddingRight: app_header_height,
    }
    return (
        <div className={`w-full flex flex-col ${centerHorizontally ? "items-center" : ""} overflow-scroll bg-gray-100`}>
            <div className='relative flex flex-col items-start justify-start' style={mainContainerStyle}>
                {children}
            </div>
        </div>
    )
}

export default DashboardMainContainer
