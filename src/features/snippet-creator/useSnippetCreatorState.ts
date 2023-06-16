import { useReducer } from "react"
import { Snippet, SnippetFrame } from "../../models"
import { tUp } from "../../utils/viewport"
import { DEFAULT_SNIPPET_CREATOR_STATE, SnippetCreatorState } from "./defs"
import { DEFAULT_ADD_SNIPPET, SHOWCASE_FRAMES } from "../../shared/show-case-frames"

type Action =
  | { type: "goToIdle" }
  | { type: "goToSandbox" }
  | { type: "toggleAutoPlay" }
  | { type: "goToNextFrame" }
  | { type: "goToPreviousFrame" }
  | { type: "toggleNavigationPanel" }
  | { type: "removeFrame"; id: number }
  | { type: "goToFrame"; id: number }
  | { type: "startEdit"; frame: SnippetFrame }
  | { type: "startEditFetchedSnippet"; snippet: Snippet }
  | { type: "startAdd" }
  | { type: "startSubmit" }
  | { type: "submit" }
  | { type: "closeNavigationPanel" }
  | {
      type: "confirmAdd"
      code: string
    }
  | { type: "confirmEdit"; code: string }

const reducer = (
  state: SnippetCreatorState,
  action: Action
): SnippetCreatorState => {
  switch (action.type) {
    case "goToIdle": {
      return DEFAULT_SNIPPET_CREATOR_STATE
    }
    case "closeNavigationPanel": {
      if (tUp(window.innerWidth)) {
        return state
      }

      return {
        ...state,
        isNavigationPanelOpen: false,
      }
    }
    case "goToFrame": {
      const idx = state.frames.findIndex(frame => frame.id === action.id)
      const selectedFrame = state.frames[idx]

      return {
        ...state,
        selectedFrame,
      }
    }
    case "goToNextFrame": {
      const idx = state.frames.findIndex(
        frame => frame.id === state.selectedFrame?.id
      )
      const nextIdx = idx + 1
      const safeNextIdx = nextIdx === state.frames.length ? 0 : nextIdx
      const selectedFrame = state.frames[safeNextIdx]

      return {
        ...state,
        selectedFrame,
      }
    }
    case "toggleNavigationPanel": {
      return {
        ...state,
        isNavigationPanelOpen: !state.isNavigationPanelOpen,
      }
    }
    case "confirmAdd": {
      const frames: SnippetFrame[] = [
        ...state.frames,
        {
          code: action.code.trim(),
          id: state.frames.length + 1,
          animation: {
            displayTime: 5000,
            type: "slideRight",
          },
        },
      ]
      const selectedFrameId = frames.length - 1
      const selectedFrame = frames[selectedFrameId]

      return {
        ...state,
        frames,
        view: "sandbox",
        selectedFrame,
      }
    }
    case "confirmEdit": {
      const frames: SnippetFrame[] = state.frames.map(frame =>
        frame.id === state.frameToEdit?.id
          ? {
              ...frame,
              code: action.code.trim(),
            }
          : frame
      )

      const idx = frames.findIndex(frame => frame.id === state.frameToEdit?.id)
      const selectedFrame = frames[idx]

      return {
        ...state,
        selectedFrame,
        view: "sandbox",
        frames,
      }
    }
    case "goToPreviousFrame": {
      const idx = state.frames.findIndex(
        frame => frame.id === state.selectedFrame?.id
      )
      const prevIdx = idx - 1
      const safePrevIdx = prevIdx === -1 ? state.frames.length - 1 : prevIdx
      const selectedFrame = state.frames[safePrevIdx]

      return {
        ...state,
        selectedFrame,
      }
    }
    case "startEdit": {
      return {
        ...state,
        view: "edit",
        code: action.frame.code,
        frameToEdit: action.frame,
      }
    }
    case "startSubmit": {
      return {
        ...state,
        view: "submit",
      }
    }
    case "submit": {
      return {
        ...state,
      }
    }
    case "removeFrame": {
      const frames = state.frames.filter(frame => frame.id !== action.id)
      const [selectedFrame] = frames

      return {
        ...state,
        frames,
        selectedFrame,
        autoPlay: false,
      }
    }
    case "goToSandbox": {
      const frames = SHOWCASE_FRAMES.map<SnippetFrame>((code, idx) => ({
        code,
        id: idx,
        animation: {
          displayTime: 5000,
          type: "slideRight",
        },
      }))

      const [selectedFrame] = frames

      return {
        ...state,
        frames,
        selectedFrame,
        view: "sandbox",
        isNavigationPanelOpen: tUp(window.innerWidth),
      }
    }
    case "startAdd": {
      return {
        ...state,
        view: "add",
        code: DEFAULT_ADD_SNIPPET,
      }
    }
    case "toggleAutoPlay": {
      return {
        ...state,
        autoPlay: !state.autoPlay,
      }
    }
    case "startEditFetchedSnippet": {
      const frames = action.snippet.frames.map<SnippetFrame>((frame, idx) => ({
        code: frame.code,
        id: idx,
        animation: {
          displayTime: 5000,
          type: "slideRight",
        },
      }))
      const [selectedFrame] = frames

      return {
        ...state,
        view: "sandbox",
        isNavigationPanelOpen: tUp(window.innerWidth),
        frames,
        selectedFrame,
      }
    }
    default:
      return state
  }
}

const useSnippetCreatorState = () => {
  const [state, dispatch] = useReducer(reducer, DEFAULT_SNIPPET_CREATOR_STATE)

  return [state, dispatch] as const
}

export { useSnippetCreatorState }
