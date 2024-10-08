/**
 * colors.tsx
 * version 1.0.0
 * 
 * Created on the 19/02/2023
 */

import { localization } from '../main/localizations'


const isInDarkColorScheme = false

const COLORS = {
    /** Basic 
    */
    clear: 'rgba(52, 52, 52, 0)',
    white: isInDarkColorScheme ? '#000000' : "#fff",
    whiteToGray: isInDarkColorScheme ? '#303134' : '#fff', // used for searchbars, tabs or bottom sheets. Is lighter than : #202124
    // Dividers : #5f6367
    // Icons : #9a9fa6
    // letters : #e8e9ed
    whiteToGray2: isInDarkColorScheme ? '#202124' : '#fff',
    black: isInDarkColorScheme ? '#fff' : '#000',
    /**  Multicolor 
    */
    darkBlue: "#17A6FF", // rgba(23, 166, 255, 1)
    newItemBlue: 'rgba(23, 166, 255, 0.15)', 
    red: "#E94258",
    green: "#30FF6F",
    /** Gray 
    */
    bgGray: '#303134', // from whiteToGray
    bgDarkGray: '#202124', // from whiteToGray2
    superWhitegray: '#FBFBFB',
    whiteGray: isInDarkColorScheme ? '#25262a' : '#F8F8F8',
    lightGray: isInDarkColorScheme ? '#303134' : '#F3F4F6',
    lightGray2: isInDarkColorScheme ? '#212323' : '#F3F4F6',
    lightGray3: isInDarkColorScheme ? '#161919' : '#F3F4F6',
    smallGrayText: 'rgba(153, 153, 153, 1)', // '#999999', // Also no content font 
    softGray: isInDarkColorScheme ? '#424446' : '#F1F1F2',  //'rgba(220, 221, 222, 0.4)', // Post counters cells + photos when in loading appearance 
    capsuleGray: isInDarkColorScheme ? '#4E4F50' : '#DCDDDE',
    darkGray: '#202323',
    borderGray: '#DDDCDD', // rgba(221, 220, 221, 1)
    placeholderGray: 'rgba(188, 188, 188, 1)',
    webDefaultBorderGray: '#E5E7EB',  // the default color for borders 
    // BRAND COLORS
    // #23dbdb: A bright, vibrant shade of cyan.
    // It is a blue-green hue that is highly saturated, with a strong presence of both blue and green. This color has a cool, refreshing feel to it, reminiscent of the sea or a clear blue sky. 
    // (It evokes a sense of freshness, clarity, and sophistication.)
    // Originaly was : #27e8e8
    primary: "rgba(255, 251, 0, 1)",
    primaryLight: "rgba(255, 251, 0, 0.3)",
}

export default COLORS


export const rainbowColors = [
    { value: "rgba(255, 87, 34, 1)", name: "Deep Orange" },
    { value: "rgba(255, 152, 0, 1)", name: "Amber Orange" },
    { value: "rgba(255, 193, 7, 1)", name: "Yellow" },
    { value: "rgba(0, 150, 136, 1)", name: "Teal" },
    { value: "rgba(0, 200, 83, 1)", name: "Bright Green" },
    { value: "rgba(37, 150, 190, 1)", name: "Ocean Blue" },
    { value: "rgba(63, 81, 181, 1)", name: "Indigo" },
    { value: "rgba(142, 36, 170, 1)", name: "Violet" },
    { value: "rgba(255, 0, 255, 1)", name: "Magenta" },
    { value: "rgba(224, 51, 86, 1)", name: "Crimson" },
    { value: "rgba(244, 67, 54, 1)", name: "Red" },
    { value: "rgba(223, 123, 32, 1)", name: "Tangerine" },
    { value: "rgba(255, 128, 0, 1)", name: "Orange" },
    { value: "rgba(244, 188, 13, 1)", name: "Gold" },
    { value: "rgba(255, 235, 59, 1)", name: "Amber" },
    { value: "rgba(153, 153, 153, 1)", name: "Gray" }, // was { value: "rgba(153, 153, 153, 1)", name: "Silver" }
    { value: "rgba(121, 85, 72, 1)", name: "Brown" },
    { value: "rgba(81, 45, 168, 1)", name: "Purple" },
    { value: "rgba(9, 132, 227, 1)", name: "Deep Sky Blue" },
    { value: "rgba(0, 177, 106, 1)", name: "Green" },
    { value: "rgba(0, 77, 64, 1)", name: "Dark Green" },
]


export const clearColor = { value: COLORS.clear, name: localization.none }