import React from "react"
import { useLayoutProvider } from "../providers/LayoutProvider"
import { useArticleProvider } from "../providers/ArticleProvider"
import { useAnalytics } from "../../utils/useAnalytics"
import { CommentsIcon } from "../../ui/icons/CommentsIcon"
import { CloseIcon } from "../../ui"

const CommentsOpener = () => {
  const { track } = useAnalytics()
  const layout = useLayoutProvider()
  const {
    state: { comments },
    setState,
  } = useArticleProvider()

  if (comments.is === "idle") {
    return (
      <button
        title={layout.t.comments.open}
        className="icon-button secondary medium rectangle"
        onClick={() => {
          track({ name: "comments_section_opened" })
          setState(state => ({
            ...state,
            comments: {
              is: "loading",
            },
          }))
        }}
      >
        <CommentsIcon />
      </button>
    )
  }

  return (
    <button
      title={layout.t.comments.close}
      className="icon-button secondary medium rectangle"
      disabled={comments.is === "loading" || comments.is === "adding"}
      onClick={() => {
        setState(state => ({
          ...state,
          comments: {
            is: "idle",
          },
        }))
      }}
    >
      <CloseIcon />
    </button>
  )
}

export { CommentsOpener }
