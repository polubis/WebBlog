import React, { useMemo } from "react"
import { CommentsProvider } from "../../comments/CommentsProvider"
import { useLayoutProvider } from "../../../providers/LayoutProvider"
import { useArticleProvider } from "../ArticleProvider"
import { M, XL } from "../../../../ui"
import { CommentsView } from "../../comments/CommentsView"
import { Rate } from "../../../components/Rate"
import type { CommentsProviderCtx } from "../../comments/models"
import { FirebaseProvider } from "../../../providers/FirebaseProvider"
import { useAnalytics } from "../../../../utils/useAnalytics"

const ConnectedComments = ({ state, load, reset }: CommentsProviderCtx) => {
  const article = useArticleProvider()
  const { track } = useAnalytics()

  return (
    <>
      <div className="section">
        {article.rate && (
          <div className="article-comment-rate">
            <XL>
              <Rate rate={article.rate} />
            </XL>
          </div>
        )}
        <XL>{article.t.comments.header}</XL>
        <M>{article.t.comments.description}</M>
        <M>{article.t.comments.notice}</M>
        <M>{article.t.comments.if_you_want_to_see}</M>
        {state.is === "idle" ? (
          <button
            title={article.t.comments.open}
            className="upper button primary"
            onClick={() => {
              track({ name: "comments_section_opened" })
              load()
            }}
          >
            {article.t.comments.open}
          </button>
        ) : (
          <button
            title={article.t.comments.close}
            className="upper button primary"
            onClick={reset}
          >
            {article.t.comments.close}
          </button>
        )}
      </div>
      {state.is !== "idle" && <CommentsView />}
    </>
  )
}

export const ArticleComments = () => {
  const layout = useLayoutProvider()
  const article = useArticleProvider()

  const path = useMemo(() => {
    const commentsPathParts = article.path.replace(/\//g, "-").split("-")
    commentsPathParts.pop()
    commentsPathParts.shift()

    return commentsPathParts.join("-")
  }, [article.path])

  return (
    <FirebaseProvider>
      <CommentsProvider path={path} lang={layout.lang.key}>
        {props => <ConnectedComments {...props} />}
      </CommentsProvider>
    </FirebaseProvider>

  )
}
