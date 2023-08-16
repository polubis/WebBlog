import type { FirebaseApp } from "firebase/app"
import type { Auth, GoogleAuthProvider } from "firebase/auth"
import type { Firestore } from "firebase/firestore"
import type { ReactNode } from "react"

export interface FirebaseProviderCtx {
  app: FirebaseApp
  auth: Auth
  db: Firestore
  provider: GoogleAuthProvider
}

export interface FirebaseProviderProps {
  children: ReactNode
}
