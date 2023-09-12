import React, { ReactNode } from "react"
import styled from "styled-components"
import theme from "../../utils/theme"
import { M } from "../text"

const Container = styled.div`
  ${M} {
    margin-top: 4px;
    color: ${theme.placeholderText};
    font-style: italic;
  }
`

export interface FieldProps {
  children: ReactNode
  description?: ReactNode
  onClick?(): void;
}

export const Field = ({ children, description, onClick }: FieldProps) => {
  return (
    <Container className='col'>
      {children}
      {description && <M className={onClick ? 'hoverable' : ''} onClick={onClick}>{description}</M>}
    </Container>
  )
}
