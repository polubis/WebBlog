import type { ReactNode, Dispatch, SetStateAction } from "react"
import type { ArticlePageModel, Comment, State, Vote } from "../core/models"
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

export interface ArticleProviderState extends Omit<ArticlePageModel, "vote"> {
  vote: VoteState
  comments: CommentsState
}

export interface ArticleProviderProps {
  children: ReactNode
  initialState: ArticleProviderState
}

export interface ArticleProviderContext {
  state: ArticleProviderState
  setState: Dispatch<SetStateAction<ArticleProviderState>>
}
