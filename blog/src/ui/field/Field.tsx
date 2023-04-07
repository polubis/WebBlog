import React, { ReactNode } from "react"
import styled from "styled-components"
import theme from "../../utils/theme"
import { M } from "../text"

const Container = styled.div`
  display: flex;
  flex-flow: column;

  ${M} {
    margin-top: 4px;
    color: ${theme.placeholderText};
    font-style: italic;
  }
`

export interface FieldProps {
  children: ReactNode
  description?: string
}

export const Field = ({ children, description }: FieldProps) => {
  return (
    <Container>
      {children}
      {description && <M>{description}</M>}
    </Container>
  )
}
