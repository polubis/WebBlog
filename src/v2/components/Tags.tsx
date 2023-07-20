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

    &:not(:last-of-type)::after {
      content: "";
      display: block;
      width: 8px;
      height: 8px;
      flex-shrink: 0;
      margin-left: 12px;
      border-radius: 50%;
      background: #bababa;
    }
  }
`

export const Tags = ({ className, children }: TagsProps) => {
    return (
        <Container className={`tags ${className ? " " + className : ""} row wrap`}>
            {children}
        </Container>
    )
}