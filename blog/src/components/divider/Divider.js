import React from "react"

import styled from "styled-components"

import theme from "../../utils/theme"

const Divider = styled.div`
  height: ${props => props.height + "px"};
  margin: ${props => props.margin};
  width: 1px;
  background: ${theme.primary};
`

export default function ({ height = 28, margin = "0px" }) {
  return <Divider height={height} margin={margin} />
}
