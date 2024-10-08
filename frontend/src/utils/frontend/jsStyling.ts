/**
 * jsStyling.ts
 * version 1.0.0
 * 
 * Created on the 19/02/2023
 */

// a file with COLORS and js Styles
import React from "react";
import COLORS from "./colors";


/** MERGES STYLES */
export function useStyles(styles: React.CSSProperties[]) {
    var style = {}
    styles.forEach(s => { Object.assign(style, s) })
    return style
}

// uncomment :{ [_: string]: React.CSSProperties; } while editing this to have the typescript propositions
// comment it to have propositions on the different available styles outside this file.
export const STYLES // :{ [key:string]: React.CSSProperties; } 
    = {
    // FONTS
    dashboardTitle: {
        fontSize: 42,
        fontWeight: "600",
        color: COLORS.black
    } as React.CSSProperties,
    dashboardSubTitle: {
        fontSize: 36,
        fontWeight: "500",
        color: COLORS.black
    } as React.CSSProperties,
    largeInput: {
        color: COLORS.black,
        fontSize: 23,
        fontWeight: 500,
        lineHeight: 1.5,
    },
    header: {
        color: COLORS.black,
        fontSize: 21,
        fontWeight: 800,
        lineHeight: 1.4,
    },
    noContentFont: {
        fontSize: 17,
        fontWeight: 'bold',
        color: COLORS.smallGrayText,
        lineHeight: "20px"
    },
    headline: {
        color: COLORS.black,
        fontSize: 17,
        fontWeight: 500,
        lineHeight: 1.3,
    },
    calloutMedium: {
        color: COLORS.black,
        fontSize: 16,
        fontWeight: 500,
        lineHeight: 1.15,
    },
    callout: {
        color: COLORS.black,
        fontSize: 16,
        fontWeight: 400,
        lineHeight: 1.15,
    },
    bold15: {
        color: COLORS.black,
        fontSize: 15,
        fontWeight: 700,
        lineHeight: "19px"
    } as React.CSSProperties,
    medium15: {
        color: COLORS.black,
        fontSize: 15,
        fontWeight: "500",
        lineHeight: "19px"
    } as React.CSSProperties,
    comment: {
        fontSize: 15,
        lineHeight: "24px",
    },
    black14: {
        color: COLORS.black,
        fontSize: 14,
        fontWeight: 400,
        lineHeight: "17px"
    },
    black13: {
        color: COLORS.black,
        fontSize: 13.5,
        lineHeight: "16px"
    },
    gray13Text: {
        color: COLORS.smallGrayText,
        fontSize: 13.5,
        lineHeight: "16px"
    },
    red13ErrorText: {
        color: COLORS.red,
        fontSize: 13.5,
        lineHeight: "16px"
    },
    gray12Text: {
        fontSize: 12,
        color: COLORS.smallGrayText,
        lineHeight: "15px" // maybee to change
    },
    black11Text: {
        fontSize: 11,
        color: COLORS.black,
        lineHeight: "13px" // maybee to change
    },
    // COMPONENTS
    iconButtonStyle: {
        width: 44,
        height: 44,
        borderRadius: 32,
        color: COLORS.black
    },
    noScrollOuterDiv: {
        // DISABLES SCROLL
        position: "fixed",
        top: "0px",
        left: "0px",
        overflow: "hidden",
        // ---------------
        width: "100%",
        height: "100vh",
        backgroundColor: COLORS.white,
    } as React.CSSProperties,
}