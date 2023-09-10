import React from "react"
import styled from "styled-components"
import type { TabProps } from "./models"

const Container = styled.div`
  background: #232323;
  color: #fff;
  cursor: pointer;

  &.active {
    background: #ff7878;
    color: #000;
  }
`

export const Tab = ({ className, active, ...props }: TabProps) => {
  // @TODO: figure out how to type ...props in styled-components.
  const activeClassName = active ? " active" : ""

  return (
    <Container {...props} className={`tab${activeClassName} ${className}`} />
  )
}
