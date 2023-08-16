import type { FirebaseApp } from "firebase/app"
import type { Auth, GoogleAuthProvider } from "firebase/auth"
import type { Firestore } from "firebase/firestore"
import type { ReactNode } from "react"
import type { Vote } from "../core/models"

export interface FirebaseProviderCtx {
  app: FirebaseApp
  auth: Auth
  db: Firestore
  provider: GoogleAuthProvider
}

export interface FirebaseProviderProps {
  children: ReactNode
}

export interface VotesProviderState {
  vote: Vote
}

export interface VotesProviderCtx extends VotesProviderState {
  addPositive: () => Promise<void>
  addNegative: () => Promise<void>
}

export interface VotesProviderProps {
  children: (ctx: VotesProviderCtx) => ReactNode
  vote?: Vote
}
