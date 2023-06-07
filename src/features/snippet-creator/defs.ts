import { SnippetFrame } from "../../models"

type Obj = Record<string, unknown> | undefined

type State<K extends string, S extends Obj = undefined> = S extends undefined
  ? {
      key: K
    }
  : {
      key: K
    } & Obj

type IdleState = State<"idle">
type LoadingState = State<"loading">

interface LoadedState {
  key: "loaded"
  autoPlay: boolean
  isNavigationPanelOpen: boolean
  selectedFrame: SnippetFrame
  frames: SnippetFrame[]
}

interface InteractedState {
  key: "interacted"
  isNavigationPanelOpen: boolean
  autoPlay: boolean
  selectedFrame: SnippetFrame
  frames: SnippetFrame[]
}

interface AddState {
  key: "add-snippet"
  code: string
  selectedFrame: SnippetFrame
  frames: SnippetFrame[]
}

interface EditState {
  key: "edit"
  code: string
  frameToEdit: SnippetFrame
  selectedFrame: SnippetFrame
  frames: SnippetFrame[]
}

interface FullScreenState {
  key: "full-screen"
  frames: SnippetFrame[]
  autoPlay: boolean
  selectedFrame: SnippetFrame
}

interface FullScreenOpeningState {
  key: "full-screen-opening"
  frames: SnippetFrame[]
  autoPlay: boolean
  selectedFrame: SnippetFrame
}

interface SubmitState {
  key: "submit"
  frames: SnippetFrame[]
  autoPlay: boolean
  selectedFrame: SnippetFrame
}

interface FailState {
  key: "failed"
}

type SnippetCreatorState =
  | IdleState
  | LoadingState
  | LoadedState
  | InteractedState
  | AddState
  | EditState
  | SubmitState
  | FullScreenState
  | FullScreenOpeningState
  | FailState

interface SnippetCreatorAction {
  start: () => void
  move: (type: "next" | "prev" | "direct", id?: number) => void
  startAdd: () => void
  confirmAdd: (code: string) => void
  closeForm: () => void
  startEdit: (frameToEdit: SnippetFrame) => void
  confirmEdit: (code: string) => void
  autoPlay: () => void
  remove: (frameToDelete: SnippetFrame) => void
  fullScreen: () => void
  fullScreenOpening: () => void
  closeFullScreen: () => void
  startSubmit: () => void
  toggleNavigationPanel: () => void
}

export type {
  SnippetCreatorState,
  IdleState,
  LoadingState,
  LoadedState,
  AddState,
  EditState,
  SubmitState,
  FullScreenOpeningState,
  InteractedState,
  FailState,
  FullScreenState,
  SnippetCreatorAction,
}
