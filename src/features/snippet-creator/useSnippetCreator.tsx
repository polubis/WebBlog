import { useEffect } from "react"
import { Snippet, SnippetFrame } from "../../models"
import { useInterval } from "./useInterval"
import { useSnippetCreatorState } from "./useSnippetCreatorState"
import { useCustomGAEvent } from "../../utils/useCustomGAEvent"

const useSnippetCreator = () => {
  const [state, dispatch] = useSnippetCreatorState()

  const { track } = useCustomGAEvent()

  const action = {
    closeNavigationPanel: () => dispatch({ type: "closeNavigationPanel" }),
    goToIdle: () => dispatch({ type: "goToIdle" }),
    goToSandbox: () => {
      track({ name: "snippet_creator_opened" })
      dispatch({ type: "goToSandbox" })
    },
    toggleAutoPlay: () => dispatch({ type: "toggleAutoPlay" }),
    goToPreviousFrame: () => dispatch({ type: "goToPreviousFrame" }),
    goToNextFrame: () => dispatch({ type: "goToNextFrame" }),
    toggleNavigationPanel: () => dispatch({ type: "toggleNavigationPanel" }),
    goToFrame: (id: number) => dispatch({ type: "goToFrame", id }),
    removeFrame: (id: number) => dispatch({ type: "removeFrame", id }),
    startEdit: (frame: SnippetFrame) => dispatch({ type: "startEdit", frame }),
    startAdd: () => dispatch({ type: "startAdd" }),
    startSubmit: () => dispatch({ type: "startSubmit" }),
    submit: () => dispatch({ type: "submit" }),
    closeForm: () => dispatch({ type: "closeForm" }),
    confirmAdd: (code: string) => dispatch({ type: "confirmAdd", code }),
    confirmEdit: (code: string) => dispatch({ type: "confirmEdit", code }),
    startEditFetchedSnippet: (snippet: Snippet) =>
      dispatch({ type: "startEditFetchedSnippet", snippet }),
  }

  const { start, cancel } = useInterval({
    onTick: action.goToNextFrame,
  })

  useEffect(() => {
    if (state.autoPlay) {
      start()
    } else {
      cancel()
    }
  }, [state.autoPlay])

  return [state, action] as const
}

export { useSnippetCreator }
