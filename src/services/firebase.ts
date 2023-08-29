import { initializeApp } from "firebase/app"
import { firebaseSecret } from "../constant/configGlobal"
export const firebaseConfig = {
  apiKey: firebaseSecret.apiKey,
  authDomain: firebaseSecret.authDomain,
  projectId: firebaseSecret.projectId,
  storageBucket: firebaseSecret.storageBucket,
  messagingSenderId: firebaseSecret.messagingSenderId,
  appId: firebaseSecret.appId,
}

export const firebaseApp = initializeApp(firebaseConfig)
