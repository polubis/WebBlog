import { initializeApp } from "firebase/app"
import { GoogleAuthProvider, getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const config = {
  apiKey: process.env.GATSBY_API_KEY,
  authDomain: process.env.GATSBY_AUTH_DOMAIN,
  projectId: process.env.GATSBY_PROJECT_ID,
  storageBucket: process.env.GATSBY_STORAGE_BUCKET,
  messagingSenderId: process.env.GATSBY_MESSAGING_SENDER_ID,
  appId: process.env.GATSBY_APP_ID,
  measurementId: process.env.GATSBY_MEASURMENT_ID,
}

const app = initializeApp(config)
const auth = getAuth(app)
const db = getFirestore(app)
const provider = new GoogleAuthProvider()

export const useFirebase = () => {
  return {
    app,
    auth,
    db,
    provider,
  }
}
