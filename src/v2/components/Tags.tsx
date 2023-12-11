import React from "react"
import styled from "styled-components"
import type { TagsProps } from "./models"

const Container = styled.h6`
  color: #bababa;
  font-size: 14px;
  line-height: 24px;
  font-weight: normal;
  word-break: break-word;
  text-transform: uppercase;
  margin: 0;
`

export const Tags = ({ children }: TagsProps) => {
  return <Container className={"tags"}>{children}</Container>
}
