import React from "react"
import styled from "styled-components"
import { VotesBoxProps } from "./models"

const Container = styled.div`
  & > * {
    width: 40px;
    height: 40px;
    border-radius: 4px;
    background: #3f3f3f;

    &:not(:first-child) {
      margin-left: 12px;
    }
  }
`

export const VotesBox = ({
  children = (
    <>
      <div />
      <div />
    </>
  ),
}: VotesBoxProps) => {
  return <Container className="row">{children}</Container>
}
