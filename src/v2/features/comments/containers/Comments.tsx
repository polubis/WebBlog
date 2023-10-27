import React from "react"
import { CommentsList } from "./CommentsList"
import { XL } from "../../../../ui"
import { CommentsForm } from "./CommentsForm"
import { useLayoutProvider } from "../../../providers/LayoutProvider"
import { useCommentsManagement } from "../../../logic/useCommentsManagement"

export const Comments = () => {
  const layout = useLayoutProvider()
  const { comments: state, reset, load } = useCommentsManagement()

  if (state.is === "loading") {
    return (
      <div className="center h-full">
        <XL className="tcenter">{layout.t.just_a_moment}</XL>
      </div>
    )
  }

  if (state.is === "fail") {
    return (
      <div className="center col h-full">
        <XL className="tcenter">{layout.t.smth_wrong}</XL>
        <div className="footer m-top-6">
          <button
            className="button secondary upper"
            title={layout.t.close}
            onClick={reset}
          >
            {layout.t.close}
          </button>
          <button
            className="button primary upper"
            title={layout.t.try_again}
            onClick={load}
          >
            {layout.t.try_again}
          </button>
        </div>
      </div>
    )
  }

  if (state.is === "loaded") {
    return <CommentsList />
  }

  if (state.is === "add" || state.is === "adding") {
    return <CommentsForm />
  }

  return null
}
