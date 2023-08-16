import { initializeApp } from 'firebase/app'
import { GoogleAuthProvider, getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import React, { createContext, useContext, useMemo } from 'react'
import { FirebaseProviderCtx, FirebaseProviderProps } from './models'

const Context = createContext<FirebaseProviderCtx | null>(null)

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

export const FirebaseProvider = ({
    children,
}: FirebaseProviderProps) => {
    const value = useMemo(() => ({
        app, auth, db, provider
    }), [])
    return <Context.Provider value={value}>{value}</Context.Provider>
}

export const useFirebaseProvider = (): FirebaseProviderCtx => {
    const context = useContext(Context)

    if (!context) {
        throw Error("Lack of provider!")
    }

    return context
}
