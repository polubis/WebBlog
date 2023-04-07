import React from "react"
import styled from "styled-components"
import { M, X } from "../../ui"
import Button from "../../components/button/Button"
import { useWithDiscussion } from "./WithDiscussion"

const Container = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  padding: 20px;

  ${M} {
    margin: 12px 0 32px 0;
    text-align: center;
  }
`

const NoComments = () => {
  const ctx = useWithDiscussion()

  return (
    <Container>
      <X>No Comments</X>
      <M>
        This post has no comments yet. Be the first and start an interesting
        discussion 🚀.
      </M>
      <Button>START DISCUSSION</Button>
    </Container>
  )
}

export { NoComments }
