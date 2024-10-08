/**
 * firebaseConfig.ts
 * version 1.0.0
 * 
 * Created on the 15/03/2023
 */

const firebaseConfig = {
    apiKey: process.env.API_KEY ?? process.env.REACT_APP_FIREBASE_API_KEY ?? "",
    authDomain: process.env.AUTH_DOMAIN ?? process.env.REACT_APP_FIREBASE_AUTH_DOMAIN ?? "",
    projectId: process.env.PROJECT_ID ?? process.env.REACT_APP_FIREBASE_PROJECT_ID ?? "",
    storageBucket: process.env.STORAGE_BUCKET ?? process.env.REACT_APP_FIREBASE_STORAGE_BUCKET ?? "",
    messagingSenderID: process.env.MESSAGING_SENDER_ID ?? process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID ?? "",
    appId: process.env.APP_ID ?? process.env.REACT_APP_FIREBASE_APP_ID ?? "",
    measurementID: process.env.MEASUREMENT_ID ?? process.env.REACT_APP_FIREBASE_MEASUREMENT_ID ?? ""
}
export default firebaseConfig