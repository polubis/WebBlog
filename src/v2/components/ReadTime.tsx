import React from "react"
import styled from "styled-components"
import Badge from "../../components/article/Badge"
import { ReadTimeIcon } from "../../ui"
import theme from "../../utils/theme"
import type { ReadTimeProps } from "./models"

const Container = styled.div`
  .row {
    & > *:first-child {
      margin-right: 4px;
      width: 16px;
      height: 16px;
    }
  }
`

const ReadTime = ({ time }: ReadTimeProps) => {
  return (
    <Container>
      <Badge className="row" color={theme.secondary}>
        <ReadTimeIcon />
        {time}m
      </Badge>
    </Container>
  )
}

export { ReadTime }
