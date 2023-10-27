import React from "react"
import { useLayoutProvider } from "../providers/LayoutProvider"
import { M, XL } from "../../ui"
import { Rate } from "../components/Rate"
import styled from "styled-components"
import { useArticleProvider } from "../providers/ArticleProvider"
import { CommentsOpener } from "./CommentsOpener"
import Loadable from "react-loadable"
import { AddVoteSection } from "./AddVoteSection"

const CommentsView = Loadable({
  loader: () =>
    import("../features/comments/CommentsView").then(m => m.CommentsView),
  loading: () => null,
})

const Container = styled.div`
  position: relative;
  background: #272727;
  padding: 28px;
  border-radius: 4px;
  max-width: 700px;
  transform: translateX(-20px);
  width: calc(100% + 40px);

  ${M} {
    margin: 12px 0 20px 0;
  }

  .article-comment-rate {
    right: 0;
    top: 0;
    padding: 16px;
    position: absolute;
  }

  .article-comment-footer {
    & > *:first-child {
      margin-right: 12px;
    }
  }
`

const CommentsSection = () => {
  const layout = useLayoutProvider()
  const {
    state: { rate, comments },
  } = useArticleProvider()

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
        <div className="article-comment-footer row">
          <CommentsOpener />
          <AddVoteSection />
        </div>
      </Container>
      {comments.is !== "idle" && <CommentsView />}
    </>
  )
}

export { CommentsSection }
