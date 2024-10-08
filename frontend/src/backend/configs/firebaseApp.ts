/**
 * firebaseApp.tsx
 * version 1.0.0
 * 
 * Created on the 15/03/2023
 */

import firebaseConfig from "./firebaseConfig";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAnalytics = getAnalytics(firebaseApp);
export const firebaseAuth = getAuth(firebaseApp)
export const firebaseDB = getFirestore(firebaseApp)