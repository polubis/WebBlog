import React from "react"
import { useLayoutProvider } from "../providers/LayoutProvider"
import { M, XL } from "../../ui"
import styled from "styled-components"
import { useArticleProvider } from "../providers/ArticleProvider"
import Loadable from "react-loadable"
import { RatingSection } from "./RatingSection"

const CommentsView = Loadable({
  loader: () =>
    import("../features/comments/CommentsView").then(m => m.CommentsView),
  loading: () => null,
})

const Container = styled.div`
  background: #272727;
  padding: 28px;
  border-radius: 4px;
  max-width: 700px;
  transform: translateX(-20px);
  width: calc(100% + 40px);

  ${M} {
    margin: 12px 0 20px 0;
  }
`

const CommentsSection = () => {
  const layout = useLayoutProvider()
  const {
    state: { comments },
  } = useArticleProvider()

  return (
    <>
      <Container className="comments-section">
        <XL>{layout.t.comments.header}</XL>
        <M>{layout.t.comments.description}</M>
        <RatingSection />
      </Container>
      {comments.is !== "idle" && <CommentsView />}
    </>
  )
}

export { CommentsSection }
