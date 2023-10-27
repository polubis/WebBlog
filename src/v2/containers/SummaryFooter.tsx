import React from "react"
import styled from "styled-components"
import { SummaryFooterContent } from "./SummaryFooterContent"

const Container = styled.div`
  .authors-section {
    margin-bottom: 32px;
  }

  .observe-me {
    margin-bottom: 20px;
  }

  .comments-section {
    margin-bottom: 20px;
  }

  .dates-section {
    margin-bottom: 32px;
  }
`

const SummaryFooter = () => {
  return (
    <Container className="col">
      <SummaryFooterContent />
    </Container>
  )
}

export { SummaryFooter }
