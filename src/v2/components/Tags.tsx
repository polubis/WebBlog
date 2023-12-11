import React from "react"
import styled from "styled-components"
import type { TagsProps } from "./models"

const Container = styled.div`
  & > * {
    display: flex;
    align-items: center;
    margin: 0 12px 12px 0;
    color: #bababa;
    font-size: 14px;
    font-weight: normal;
    text-transform: uppercase;
  }
`

export const Tags = ({ className, children }: TagsProps) => {
  return (
    <Container className={`tags ${className ? " " + className : ""} row wrap`}>
      {children}
    </Container>
  )
}
