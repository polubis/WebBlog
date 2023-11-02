import type { ReactNode, Dispatch, SetStateAction } from "react"
import type {
  ArticleT,
  ArticleThumbnail,
  CDate,
  Comment,
  LangKey,
  Mdate,
  Path,
  Rate,
  Seniority,
  Slug,
  State,
  Technology,
  Title,
  Url,
  User,
  Vote,
} from "../core/models"
import type comments_en from "../translation/comments/en.json"
import type comments_pl from "../translation/comments/pl.json"
import type { User as FirebaseUser } from "firebase/auth"

export type VoteUpdateAction = "increment" | "decrement"

export interface VoteState {
  vote: Vote
  is: "idle" | "adding" | "added" | "not-added"
}

export type CommentsT = typeof comments_en | typeof comments_pl
export type IdleState = State<"idle">
export type LoadingState = State<"loading">
export type LoadedState = State<"loaded", { comments: Comment[] }>
export type FailState = State<"fail">
export type AddState = State<"add", { comments: Comment[]; user: FirebaseUser }>
export type AddingState = State<
  "adding",
  { comments: Comment[]; user: FirebaseUser }
>

export type CommentsState =
  | IdleState
  | LoadingState
  | LoadedState
  | FailState
  | AddState
  | AddingState

export interface ArticleProviderState {
  path: Path
  cdate: CDate
  mdate: Mdate
  ga_page: string
  author: Omit<User, "avatar"> & {
    avatar: Pick<User["avatar"], "small" | "medium">
  }
  source_url: Url
  title: Title
  url: Url
  t: ArticleT
  thumbnail: ArticleThumbnail
  slug: Slug
  translation_path?: string
  lang: LangKey
  ling_reviewer: Omit<User, "avatar"> & {
    avatar: Pick<User["avatar"], "small">
  }
  is_new: boolean
  body: string
  description: string
  duration: number
  rate?: Rate
  vote: VoteState
  comments: CommentsState
  resourcePath: Path
  tech_reviewer: Omit<User, "avatar"> & {
    avatar: Pick<User["avatar"], "small">
  }
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

export interface ArticleProviderProps {
  children: ReactNode
  initialState: ArticleProviderState
}

export interface ArticleProviderContext {
  state: ArticleProviderState
  setState: Dispatch<SetStateAction<ArticleProviderState>>
}
