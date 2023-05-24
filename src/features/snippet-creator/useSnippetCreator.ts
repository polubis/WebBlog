import { useRef, useState } from "react"
import { DEFAULT_ADD_SNIPPET, DEFAULT_FRAMES, DEFAULT_STATE } from "./consts"
import type { SnippetCreatorState, SnippetFrame } from "./defs"
import { isAddSnippet, isEditSnippet, isPrepared } from "./guards"
import { useInterval } from "./useInterval"

const useSnippetCreator = () => {
  const [_, setCounter] = useState(0)
  const state = useRef(DEFAULT_STATE)

  const update = (newState: SnippetCreatorState): void => {
    state.current = newState
    setCounter(prev => prev + 1)
  }

  const start = (): void => {
    update({ key: "loading" })

    setTimeout((): void => {
      const frames = DEFAULT_FRAMES.map<SnippetFrame>((code, idx) => ({
        code,
        id: idx,
        animation: {
          displayTime: 5000,
          type: "slide-right",
        },
      }))

      const [firstFrame] = frames

      update({
        key: "loaded",
        frames,
        selectedFrame: firstFrame,
        autoPlay: false,
      })
    }, 1000)
  }

  const move = (type: "next" | "prev" | "direct", id?: number): void => {
    if (!isPrepared(state.current)) {
      return
    }

    const { selectedFrame, frames, autoPlay } = state.current

    if (type === "next") {
      const currentIdx = frames.findIndex(
        frame => frame.id === selectedFrame.id
      )
      const nextIdx = currentIdx + 1
      const safeNextIdx = nextIdx === frames.length ? 0 : nextIdx

      update({
        key: "interacted",
        frames,
        selectedFrame: frames[safeNextIdx],
        autoPlay,
      })

      return
    }

    if (type === "prev") {
      const currentIdx = frames.findIndex(
        frame => frame.id === selectedFrame.id
      )
      const prevIdx = currentIdx - 1
      const safePrevIdx = prevIdx === -1 ? frames.length - 1 : prevIdx

      update({
        key: "interacted",
        frames,
        selectedFrame: frames[safePrevIdx],
        autoPlay,
      })

      return
    }

    if (type === "direct") {
      const currentIdx = frames.findIndex(frame => frame.id === id)

      if (currentIdx === -1) return

      update({
        key: "interacted",
        frames,
        selectedFrame: frames[currentIdx],
        autoPlay,
      })

      return
    }
  }

  const interval = useInterval({
    onTick: () => move("next"),
  })

  const closeForm = (): void => {
    if (!isAddSnippet(state.current) && !isEditSnippet(state.current)) {
      return
    }

    update({
      ...state.current,
      key: "loaded",
      autoPlay: false,
    })
  }

  const startAdd = (): void => {
    if (!isPrepared(state.current)) {
      return
    }

    update({
      ...state.current,
      code: DEFAULT_ADD_SNIPPET,
      key: "add-snippet",
    })
  }

  const confirmAdd = (code: string): void => {
    if (!isAddSnippet(state.current)) {
      return
    }

    const frames: SnippetFrame[] = [
      ...state.current.frames,
      {
        code: code.trim(),
        id: state.current.frames.length,
        animation: {
          displayTime: 5000,
          type: "slide-right",
        },
      },
    ]
    const selectedFrameId = frames.length - 1
    const selectedFrame = frames[selectedFrameId]

    update({
      frames,
      selectedFrame,
      key: "interacted",
      autoPlay: false,
    })
  }

  const autoPlay = (): void => {
    if (!isPrepared(state.current)) {
      return
    }

    if (state.current.autoPlay) {
      update({
        ...state.current,
        autoPlay: false,
      })
      interval.cancel()
      return
    }

    update({
      ...state.current,
      autoPlay: true,
    })
    interval.start()
  }

  const startEdit = (frameToEdit: SnippetFrame): void => {
    if (!isPrepared(state.current)) {
      return
    }

    update({
      ...state.current,
      code: frameToEdit.code,
      key: "edit",
      frameToEdit,
    })
  }

  const confirmEdit = (code: string): void => {
    if (!isEditSnippet(state.current)) {
      return
    }

    const currentState = state.current

    const frames: SnippetFrame[] = state.current.frames.map(frame =>
      frame.id === currentState.frameToEdit.id
        ? {
            ...frame,
            code: code.trim(),
          }
        : frame
    )

    const idx = frames.findIndex(
      frame => frame.id === currentState.frameToEdit.id
    )
    const selectedFrame = frames[idx]

    update({
      key: "interacted",
      selectedFrame,
      frames: state.current.frames,
      autoPlay: false,
    })
  }

  const startDelete = (frameToDelete: SnippetFrame): void => {
    const s = state.current

    if (!isPrepared(s)) return

    update({
      key: "delete",
      frameToDelete,
      frames: s.frames.filter(frame => frame.id !== frameToDelete.id),
      selectedFrame: s.selectedFrame,
    })
  }

  const action = {
    start,
    move,
    startAdd,
    confirmAdd,
    closeForm,
    startEdit,
    confirmEdit,
    autoPlay,
    startDelete,
  }

  return [state.current, action] as const
}

export { useSnippetCreator }
