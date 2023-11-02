import React from "react"
import styled from "styled-components"
import { CommentsOpener } from "./CommentsOpener"
import { AddVoteSection } from "./AddVoteSection"
import { XL } from "../../ui"
import { Rate } from "../components/Rate"
import { useArticleProvider } from "../providers/ArticleProvider"
import { RatingSectionProps } from "./models"
import c from "classnames"

const Container = styled.div`
  & > *:not(:last-child) {
    margin-right: 12px;
  }
`

export const RatingSection = ({ className }: RatingSectionProps) => {
  const {
    state: { rate },
  } = useArticleProvider()

  return (
    <Container className={c("rating-section", "row", className)}>
      <CommentsOpener />
      <AddVoteSection />
      {rate && (
        <XL>
          <Rate rate={rate} />
        </XL>
      )}
    </Container>
  )
}
