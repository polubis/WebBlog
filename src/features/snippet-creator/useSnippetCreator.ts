import { useRef, useState } from "react"
import { DEFAULT_ADD_SNIPPET, DEFAULT_FRAMES, DEFAULT_STATE } from "./consts"
import type { SnippetCreatorState, SnippetFrame } from "./defs"
import { isAddSnippet, isEditSnippet, isPrepared } from "./guards"
import { useInterval } from "./useInterval"
import { useKeyPress } from "../../utils/useKeyPress"

const getNextIdx = (idx: number, length: number): number => {
  const nextIdx = idx + 1
  const safeNextIdx = nextIdx === length ? 0 : nextIdx

  return safeNextIdx
}

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

      update({
        key: "interacted",
        frames,
        selectedFrame: frames[getNextIdx(currentIdx, frames.length)],
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

  useKeyPress({
    onKeyPress: e => {
      const s = state.current

      if (!isPrepared(s)) {
        return
      }

      if (e.key === "a") {
        move("prev")
        return
      }

      if (e.key === "d") {
        move("next")
        return
      }

      if (e.key === "n") {
        startAdd()
        return
      }

      if (e.key === "p") {
        autoPlay()
        return
      }

      if (e.key === "e") {
        startEdit(s.selectedFrame)
        return
      }

      if (e.key === "r") {
        remove(s.selectedFrame)
      }
    },
  })

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
    interval.cancel()

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
        id: state.current.frames.length + 1,
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
    interval.cancel()

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
    const s = state.current

    if (!isEditSnippet(s)) {
      return
    }

    const frames: SnippetFrame[] = s.frames.map(frame =>
      frame.id === s.frameToEdit.id
        ? {
            ...frame,
            code: code.trim(),
          }
        : frame
    )

    const idx = frames.findIndex(frame => frame.id === s.frameToEdit.id)
    const selectedFrame = frames[idx]

    update({
      key: "interacted",
      selectedFrame,
      frames,
      autoPlay: false,
    })
  }

  const remove = (frameToDelete: SnippetFrame): void => {
    interval.cancel()

    const s = state.current

    if (!isPrepared(s) || s.frames.length <= 1) return

    const frames = s.frames.filter(frame => frame.id !== frameToDelete.id)
    const selectedFrame = frames[0]

    update({
      key: "interacted",
      frames,
      selectedFrame,
      autoPlay: false,
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
    remove,
  }

  return [state.current, action] as const
}

export { useSnippetCreator }
