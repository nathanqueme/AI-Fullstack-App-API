/**
 * main.ts
 * version 1.0.0
 * 
 * Created on the 09/05/2023
 */

import { useEffect, useState } from "react"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { MAIN_CONFIG } from "../../utils/main"
dayjs.extend(relativeTime) // enables using other functions such as fromNow()

const { HL = "en" } = MAIN_CONFIG

export function isDeviceMobile() {

    function isLandscape() {
        return Math.abs(window.orientation) === 90
    }

    const smallWidth = window?.screen?.width < 500
    const landscape = isLandscape()
    return smallWidth || landscape
}

export function generateID(length = 4, onlyNumbers = false, charactersToUse = "") {
    var result = ''
    var characters = charactersToUse !== "" ? charactersToUse : onlyNumbers ? '0123456789' : 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    var charactersLength = characters.length

    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength))
    }

    return result
}

/** USED TO CHECK THE VALIDITY OF A STRING : 
 * - 1 - IF IT IS A STRING 
 * - 2 - IF IT HAS A NON EMPTY VALUE 
 */
export function isStringValid(value: any | null | undefined) {
    return ((value !== undefined) && (value !== null) && (typeof (value) === "string") && (value !== ""))
}

/** USED TO CHECK THE VALIDITY OF AN ARRAY : 
 * - 1 - IF IT IS AN ARRAY 
 * - 2 - IF IT HAS AT LEAST ONE VALUE 
 */
export function isArrayValid(value: any | null | undefined) {
    return ((value !== undefined) && (value !== null) && (typeof (value) === "object") && ((value as any[])?.length > 0))
}

/** USED TO CHECK THE VALIDITY OF A DATES' STRING (new Date().toISOString()) : 
 * - 1 - IF IT IS A STRING AND A NON EMPTY VALUE 
 * - 2 - IF IT IS A VALID DATE
 */
export function isDateStringValid(value: any | null | undefined) {
    const isAString = isStringValid(value)
    if (!isAString) return false
    try {
        new Date(value)
        return true
    } catch (error) {
        return false
    }
}

/** Retrieves user navigator locale. This is most of the time user's locale, user can change it and it is instantaneous. */
export function getDeviceLanguage() {
    return navigator.language.split("-")[0] // "de-DE" -> "de" or "en-UK" -> "en"
}

/**
 * This code defines a custom hook called useSafeAreaInsets() that uses the useState() and useEffect() hooks to manage the safe area insets. The hook adds a resize event listener to the window object, which is triggered whenever the size of the viewport changes.
 * When the resize event is triggered, the handleResize() function is called. This function uses the window.matchMedia() method to check whether the app is running in standalone mode (i.e., installed as a Progressive Web App). If the app is running in standalone mode, the handleResize() function sets the bottom safe area to either 34 or 20 pixels (depending on the height of the viewport), and updates the insets state accordingly. If the app is not running in standalone mode, the handleResize() function sets the bottom safe area to the difference between the height of the window object and the height of the document.documentElement element (which represents the visible area of the page), and updates the insets state accordingly.
 */
export function useSafeAreaInsets() {
    const handleChanges = true
    const [insets, setInsets] = useState({ top: 0, right: 0, bottom: 0, left: 0 });

    useEffect(() => {
        const handleResize = () => {
            const mq = window.matchMedia('(display-mode: standalone)');
            const isStandalone = mq.matches;
            const isNativeApp = false // FIXME: check if it is a native app
            const nonStandaloneBottom = window.innerHeight - document.documentElement.clientHeight
            const standaloneBottom = window.matchMedia('(min-height: 20em) and (max-height: 30em)').matches ? 34 : 34// 34 : 20;
            setInsets({
                top: 0,
                right: 0,
                // when the app is native, safe area inset bottom is already handled 
                // by the app, to have the exact device's inset and for a better UI /
                // user expericence (feels/looks better) e.g. on iPhone 13
                bottom: isNativeApp ? 0 : (isStandalone ? standaloneBottom : nonStandaloneBottom),
                left: 0
            });

        };

        handleResize();
        if (handleChanges) window.addEventListener('resize', handleResize);

        return () => {
            if (handleChanges) window.removeEventListener('resize', handleResize);
        };
    }, []);

    return insets;
}

/** https://domain.com/path/page?user=0 returns `["path", "page"]` */
export function getSegmentsFromUrl(urlString = window.location.toString()): string[] {
    const url = new URL(urlString)
    const segments = url.pathname.trim().split("/")
    return segments.filter(e => e !== "")
}

export function getFileMetadata(file: File) {

    const fileName = file.name

    const lastModifDate = new Date(file.lastModified);
    const lastModified = dayjs(lastModifDate).locale(HL).fromNow()

    let fileSize = ""
    const fileSizeInBytes = file.size;
    if (fileSizeInBytes < 1024) {
        fileSize = fileSizeInBytes + ' bytes';
    } else if (fileSizeInBytes < 1024 * 1024) {
        fileSize = (fileSizeInBytes / 1024).toFixed(2) + ' KB';
    } else {
        const fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);
        fileSize = fileSizeInMegabytes.toFixed(2) + ' MB';
    }

    return { fileName, lastModified, fileSize }
}

// from (mixpanel) and : https://stackoverflow.com/a/105074
export function getSessionID() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

export function base64ToBlob(base64String: string, contentType = "image/jpeg") {
    // Extract the Base64 data from the string
    const base64Data = base64String.split(';base64,').pop() ?? "";

    // Convert the Base64 data to binary data
    const binaryData = window.atob(base64Data);

    // Create an ArrayBuffer from the binary data
    const buffer = new ArrayBuffer(binaryData.length);
    const uint8Array = new Uint8Array(buffer);

    // Fill the Uint8Array with the binary data
    for (let i = 0; i < binaryData.length; i++) {
        uint8Array[i] = binaryData.charCodeAt(i);
    }

    // Create the Blob object with the binary data
    const blob = new Blob([uint8Array], { type: contentType });

    return blob;
}

/** e.g. const file = new Blob([data], { type: 'text/plain' }); */
export const downloadFile = (file: Blob, filename: string) => {
    const element = document.createElement("a");
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
}