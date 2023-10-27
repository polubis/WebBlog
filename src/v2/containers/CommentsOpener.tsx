import React from "react"
import { useLayoutProvider } from "../providers/LayoutProvider"
import { useArticleProvider } from "../providers/ArticleProvider"
import { useAnalytics } from "../../utils/useAnalytics"

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
        className="upper button primary"
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
        {layout.t.comments.open}
      </button>
    )
  }

  return (
    <button
      title={layout.t.comments.close}
      className="upper button primary"
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
      {layout.t.comments.close}
    </button>
  )
}

export { CommentsOpener }
