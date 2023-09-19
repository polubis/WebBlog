import React, { useMemo } from "react"
import { FirebaseProvider } from "../providers/FirebaseProvider"
import { CommentsProvider } from "../features/comments/CommentsProvider"
import { useLayoutProvider } from "../providers/LayoutProvider"
import { M, XL } from "../../ui"
import { Rate } from "../components/Rate"
import { CommentsView } from "../features/comments/CommentsView"
import { useAnalytics } from "../../utils/useAnalytics"
import { useArticleBasedDataProvider } from "../providers/ArticleBasedDataProvider"
import { convertToFirebasePath } from "../utils/convertToFirebasePath"
import { CommentsProviderCtx } from "../features/comments/models"
import styled from "styled-components"

const Container = styled.div`
  position: relative;
  background: #272727;
  padding: 28px;
  border-radius: 4px;
  max-width: 700px;
  transform: translateX(-20px);
  width: calc(100% + 40px);

  ${M} {
    margin: 4px 0 20px 0;
  }

  .article-comment-rate {
    right: 0;
    top: 0;
    padding: 16px;
    position: absolute;
  }
`

const ConnectedComments = ({ state, load, reset }: CommentsProviderCtx) => {
  const layout = useLayoutProvider()
  const { rate } = useArticleBasedDataProvider()
  const { track } = useAnalytics()

  return (
    <>
      <Container className="comments-section">
        {rate && (
          <div className="article-comment-rate">
            <XL>
              <Rate rate={rate} />
            </XL>
          </div>
        )}
        <XL>{layout.t.comments.header}</XL>
        <M>{layout.t.comments.description}</M>
        {state.is === "idle" ? (
          <button
            title={layout.t.comments.open}
            className="upper button primary"
            onClick={() => {
              track({ name: "comments_section_opened" })
              load()
            }}
          >
            {layout.t.comments.open}
          </button>
        ) : (
          <button
            title={layout.t.comments.close}
            className="upper button primary"
            onClick={reset}
          >
            {layout.t.comments.close}
          </button>
        )}
      </Container>
      {state.is !== "idle" && <CommentsView />}
    </>
  )
}

const CommentsSection = () => {
  const { path } = useArticleBasedDataProvider()
  const layout = useLayoutProvider()
  const preparedPath = useMemo(() => convertToFirebasePath(path), [path])

  return (
    <FirebaseProvider>
      <CommentsProvider path={preparedPath} lang={layout.lang.key}>
        {props => <ConnectedComments {...props} />}
      </CommentsProvider>
    </FirebaseProvider>
  )
}

export { CommentsSection }
