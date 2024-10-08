/**
 * mainConfig.ts
 * version 1.0.0
 * 
 * Created on the 09/05/2023
 */

import { isHLSupported } from "./localizations"

const { PORT = 7070, NODE_ENV = "production" } = process.env
const deviceHL = navigator.language.split("-")[0]

const MAIN_CONFIG = {
    PORT: PORT,
    NODE_ENV: NODE_ENV,
    /** avoids doing mistakes by checking every value here */
    PRODUCTION: NODE_ENV === "production",
    DEVELOPMENT: NODE_ENV === "development",
    TEST: NODE_ENV === "test",
    APP_FOLDER_NAME: "Spread-Hub-Local-Data", 
    HL: isHLSupported(deviceHL) ? deviceHL : "en"
}
export default  MAIN_CONFIG