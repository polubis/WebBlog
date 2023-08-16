import React from "react"
import styled from "styled-components"
import { M_DOWN, M_UP } from "../../utils/viewport"
import { VotesBoxProps } from "./models"

const Container = styled.div`
  @media ${M_UP} {
    & > *:not(:first-child) {
      margin-left: 12px;
    }
  }

  @media ${M_DOWN} {
    flex-flow: column;

    & > *:not(:first-child) {
      margin-top: 12px;
    }
  }

  & > * {
    width: 40px;
    height: 40px;
    border-radius: 4px;
    background: #3e3e3e;
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
