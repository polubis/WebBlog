import { SnippetFrame } from "../../models"
import { useSnippetCreator } from "./useSnippetCreator"

export const SNIPPET_CREATOR_VIEWS = [
  "idle",
  "sandbox",
  "edit",
  "add",
  "submit",
] as const

export type SnippetCreatorView = typeof SNIPPET_CREATOR_VIEWS[number]

export interface SnippetCreatorState {
  view: SnippetCreatorView
  autoPlay: boolean
  isNavigationPanelOpen: boolean
  selectedFrame: SnippetFrame | null
  frameToEdit: SnippetFrame | null
  frames: SnippetFrame[]
  code: string
}

export type SnippetCreatorAction = ReturnType<typeof useSnippetCreator>[1]

export const DEFAULT_SNIPPET_CREATOR_STATE: SnippetCreatorState = {
  view: "idle",
  autoPlay: false,
  isNavigationPanelOpen: false,
  selectedFrame: null,
  frameToEdit: null,
  frames: [],
  code: "",
}
