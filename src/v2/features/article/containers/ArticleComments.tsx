import React, { useMemo } from "react"
import { useCustomGAEvent } from "../../../../utils/useCustomGAEvent"
import { CommentsProvider } from "../../comments/CommentsProvider"
import { useLayoutProvider } from "../../../providers/LayoutProvider"
import { useArticleProvider } from "../ArticleProvider"
import { M, XL } from "../../../../ui"
import { CommentsView } from "../../comments/CommentsView"
import { Rate } from "../../../components/Rate"

export const ArticleComments = () => {
  const layout = useLayoutProvider()
  const article = useArticleProvider()
  const { track } = useCustomGAEvent()

  const path = useMemo(() => {
    const commentsPathParts = article.path.replace(/\//g, "-").split("-")
    commentsPathParts.pop()
    commentsPathParts.shift()

    return commentsPathParts.join("-")
  }, [article.path])

  return (
    <CommentsProvider path={path} lang={layout.lang.key}>
      {({ load, reset, state }) => (
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
      )}
    </CommentsProvider>
  )
}
