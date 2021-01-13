import React from "react"
import { Link as GatsbyLink } from "gatsby"

import styled from "styled-components"

import theme from "../../utils/theme"

const Divider = styled.div`
  height: ${props => props.h + "px"};
  margin: ${props => props.m};
  width: 1px;
  background: ${theme.primary};
`

export default function ({ h = 28, m = '0px' }) {
  return <Divider h={h} m={m} />
}
