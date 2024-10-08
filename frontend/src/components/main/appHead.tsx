/**
 * appHead.tsx
 * version 1.0.0
 * 
 * Created on the 28/05/2023
 */

import CONSTANTS from "../../utils/main/constants"
import { Fragment } from "react"
import { STYLES } from "../../utils/frontend"
import { COLORS, localization, } from "../../utils/main"
import { Spacer } from "./spacer"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { MAIN_CONFIG } from "../../utils/main"
import { DecoRectangle } from "../deco"
import { useAppSelector } from "../../data/state/hooksForTS"
dayjs.extend(relativeTime) // enables using other functions such as fromNow()


const { HL = "en" } = MAIN_CONFIG
const { APP_NAME, UI: { HEADER_HEIGHT } } = CONSTANTS

interface AppHeadProps {
    hideDeco?: boolean
    displayAppDescription?: boolean
}
/** App's name, moto as well as information (last connection and uploads count) */
export default function AppHead({ hideDeco = false, displayAppDescription = true }: AppHeadProps) {

    const { analyticsValues: { last_session_ended_at, today_upload_count,
    } } = useAppSelector(state => state);
    const displayLastConnectedAt = dayjs(last_session_ended_at).locale(HL).fromNow();
    const x_docs = localization.formatString(localization.x_documents, today_upload_count);

    return (
        <Fragment>
            <Spacer paddingSize={"outer"} />
            <h1 id="app-header" style={STYLES.dashboardSubTitle}>{APP_NAME}</h1>
            <Spacer paddingSize='inner_small' />
            <Spacer paddingSize='inner_small' />

            {(displayAppDescription) &&
                <Fragment>
                    {/*<p style={STYLES.callout}>{"Last connection:" + displayLastConnectedAt}</p>*/}
                    <p className='mr-10' style={STYLES.black13}><span className='mr-1'>{"Last connection:"}</span>{displayLastConnectedAt}</p>
                    <Spacer paddingSize='inner_small' />
                </Fragment>
            }

            <div className='mt-1 flex items-center justify-start'>
                <p className='mr-10' style={STYLES.black13}><span className='mr-1'>{"Today's uploads:"}</span>{x_docs}</p>
            </div>

            {(hideDeco !== true) &&
                <Fragment>
                    <Spacer customSize={HEADER_HEIGHT} />

                    {/* DECO - GROUP 1 */}
                    <DecoRectangle
                        height={"18px"} width={"18px"}
                        color={COLORS.primary} left="635px"
                        top="147px" borderAnimation="rectangle-to-circle"
                    />
                    <DecoRectangle
                        color={"pink"} height={"36px"}
                        width={"36px"} top="140px" left="675px"
                        borderAnimation="rectangle-to-circle"
                    />
                    {/* DECO - GROUP 2 */}
                    <DecoRectangle color="red" top="50px" left="870px" height='13px' width='13px' borderAnimation="rectangle-to-circle" />
                    <DecoRectangle color="#3464e3" top="145px" left="935px" height={"67px"} width={"67px"} borderAnimation="rectangle-to-circle" />

                </Fragment>
            }
        </Fragment>
    )
}