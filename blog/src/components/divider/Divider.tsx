import React from "react"

import styled from "styled-components"

import theme from "../../utils/theme"

interface Props {
  height?: number
  margin?: string
}

const Divider = styled.div`
  height: ${(props: Props) => props.height + "px"};
  margin: ${(props: Props) => props.margin};
  width: 1px;
  background: ${theme.primary};
`

export default function ({
  height = 28,
  margin = "0px",
}: Props): React.ReactElement {
  return <Divider height={height} margin={margin} />
}
