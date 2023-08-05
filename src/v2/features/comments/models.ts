import type { ReactNode } from "react"
import type { Comment, LangKey } from "../../core/models"
import type comments_en from "../../translation/comments/en.json"
import type comments_pl from "../../translation/comments/en.json"

type State<I extends string, T = undefined> = T extends undefined
  ? { is: I }
  : { is: I } & T

export type CommentsT = typeof comments_en | typeof comments_pl
export type IdleState = State<"idle">
export type LoadingState = State<"loading">
export type LoadedState = State<"loaded", { comments: Comment[] }>
export type FailState = State<"load_fail">
export type AddState = State<"add", { comments: Comment[] }>
export type AddingState = State<"adding", { comments: Comment[] }>
export type AddFailState = State<"add_fail", { comments: Comment[] }>

export type CommentsProviderState =
  | IdleState
  | LoadingState
  | LoadedState
  | FailState
  | AddState
  | AddingState
  | AddFailState

export interface CommentsProviderCtx {
  state: CommentsProviderState
  t: CommentsT
  add: (comment: Omit<Comment, "id" | "path">) => Promise<void>
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
