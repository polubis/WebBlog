import type { FirebaseApp } from "firebase/app"
import type { Auth, GoogleAuthProvider } from "firebase/auth"
import type { Firestore } from "firebase/firestore"
import type { ReactNode } from "react"
import type {
  CDate,
  Mdate,
  Path,
  Rate,
  Seniority,
  Technology,
  Title,
  Url,
  User,
  Vote,
} from "../core/models"

export interface FirebaseProviderCtx {
  app: FirebaseApp
  auth: Auth
  db: Firestore
  provider: GoogleAuthProvider
}

export interface FirebaseProviderProps {
  children: ReactNode
}

export type VotesProviderIdle = { is: "idle" }
export type VotesProviderLoading = { is: "loading" }
export type VotesProviderOk = { is: "ok"; vote: Vote }
export type VotesProviderSaving = { is: "saving"; vote: Vote }
export type VotesProviderFail = { is: "fail" }

export type VotesProviderState =
  | VotesProviderIdle
  | VotesProviderLoading
  | VotesProviderOk
  | VotesProviderSaving
  | VotesProviderFail

export interface VotesProviderCtx {
  state: VotesProviderState
  addPositive: () => void
  addNegative: () => void
  load: () => void
}

export interface VotesProviderProps {
  children: (ctx: VotesProviderCtx) => ReactNode
  path: Path
}

export interface ArticleBasedDataProviderModel {
  path: Path
  cdate: CDate
  mdate: Mdate
  author: Omit<User, "avatar"> & {
    avatar: Pick<User["avatar"], "small" | "medium">
  }
  source_url: Url
  title: Title
  description: string
  duration: number
  rate?: Rate
  next?: {
    path: Path
  }
  prev?: {
    path: Path
  }
  seniority: Seniority
  tags: string[]
  technologies: Technology[]
}
