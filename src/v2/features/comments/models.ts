import type { ReactNode } from "react"
import type { Comment, LangKey, Rate, State } from "../../core/models"
import type comments_en from "../../translation/comments/en.json"
import type comments_pl from "../../translation/comments/en.json"
import type { User } from "firebase/auth"

export type CommentsT = typeof comments_en | typeof comments_pl
export type IdleState = State<"idle">
export type LoadingState = State<"loading">
export type LoadedState = State<"loaded", { comments: Comment[] }>
export type FailState = State<"fail">
export type AddState = State<"add", { comments: Comment[]; user: User }>
export type AddingState = State<"adding", { comments: Comment[]; user: User }>

export type CommentsProviderState =
  | IdleState
  | LoadingState
  | LoadedState
  | FailState
  | AddState
  | AddingState

export interface CommentsProviderCtx {
  state: CommentsProviderState
  t: CommentsT
  add: (content: string, rate?: Rate) => Promise<void>
  load: () => Promise<void>
  reset: () => void
  startReadComments: () => void
  startAdd: () => void
}

export type CommentsProviderNullableCtx = CommentsProviderCtx | null

export interface CommentsProviderProps {
  children: (ctx: CommentsProviderCtx) => ReactNode
  path: Comment["path"]
  lang: LangKey
}

export interface CommentsViewProps {
  path: Comment["path"]
}
