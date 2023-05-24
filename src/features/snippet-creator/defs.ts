type Obj = Record<string, unknown> | undefined

type State<K extends string, S extends Obj = undefined> = S extends undefined
  ? {
      key: K
    }
  : {
      key: K
    } & Obj

interface SnippetFrame {
  id: number
  code: string
  animation: {
    displayTime: number
    type: "slide-right" | "opacity" | "slide-left"
  }
}

type IdleState = State<"idle">
type LoadingState = State<"loading">

interface LoadedState {
  key: "loaded"
  autoPlay: boolean
  selectedFrame: SnippetFrame
  frames: SnippetFrame[]
}

interface InteractedState {
  key: "interacted"
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

interface DeleteState {
  key: "delete"
  frameToDelete: SnippetFrame
  selectedFrame: SnippetFrame
  frames: SnippetFrame[]
}

interface FailState {
  key: "failed"
  reason: "unknown"
}

type SnippetCreatorState =
  | IdleState
  | LoadingState
  | LoadedState
  | InteractedState
  | AddState
  | DeleteState
  | EditState
  | FailState

export type {
  SnippetCreatorState,
  SnippetFrame,
  IdleState,
  LoadingState,
  LoadedState,
  AddState,
  EditState,
  InteractedState,
  DeleteState,
  FailState,
}
