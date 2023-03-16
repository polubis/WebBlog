import React from "react"
import styled from "styled-components"
import Badge from "../../components/article/Badge"
import theme from "../../utils/theme"
import { usePortal } from "../../utils/usePortal"

const Container = styled.div`
  position: fixed;
  top: 22px;
  right: 0;
  left: 0;
  margin: 0 auto;
  z-index: 2000;
  width: max-content;
`

export interface AlertProps {
  message: string
}

export const Alert = ({ message }: AlertProps) => {
  const { render } = usePortal()

  return render(
    <Container>
      <Badge color={theme.bg} background={theme.secondary}>
        {message}
      </Badge>
    </Container>
  )
}
