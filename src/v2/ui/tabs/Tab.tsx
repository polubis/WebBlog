import React from "react"
import styled from "styled-components"
import type { TabProps } from "./models"
import c from 'classnames'

const Container = styled.div`
  background: #232323;
  cursor: pointer;

  * {
    color: #fff;
    font-weight: bolder !important;
  }

  &.active {
    background: #ff7878;

    * {
      color: #000;
    }
  }
`

export const Tab = ({ className, active, ...props }: TabProps) => {
  // @TODO: figure out how to type ...props in styled-components.
  return (
    <Container {...props} className={c('tab', { active }, className)} />
  )
}
