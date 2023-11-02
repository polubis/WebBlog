import type { ReactNode, Dispatch, SetStateAction } from "react"
import type { ArticlePageModel, Vote } from "../core/models"
import type comments_en from "../translation/comments/en.json"
import type comments_pl from "../translation/comments/pl.json"

export type VoteUpdateAction = "increment" | "decrement"

export interface VoteState {
  vote: Vote
  is: "idle" | "adding" | "added" | "not-added"
}

export type CommentsT = typeof comments_en | typeof comments_pl

export type ArticleProviderState = ArticlePageModel

export interface ArticleProviderProps {
  children: ReactNode
  initialState: ArticleProviderState
}

export interface ArticleProviderContext {
  state: ArticleProviderState
  setState: Dispatch<SetStateAction<ArticleProviderState>>
}
