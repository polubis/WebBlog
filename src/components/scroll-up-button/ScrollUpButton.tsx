import React from "react"

import styled from "styled-components"
import { ArrowLeftIcon, IconButton } from "../../ui"

interface ScrollUpButtonProps {
  onClick: () => void
}

const Container = styled.div`
  svg {
    transform: rotate(90deg);
  }
`

export const ScrollUpButton = ({ onClick }: ScrollUpButtonProps) => {
  return (
    <Container>
      <IconButton onClick={onClick}>
        <ArrowLeftIcon />
      </IconButton>
    </Container>
  )
}
