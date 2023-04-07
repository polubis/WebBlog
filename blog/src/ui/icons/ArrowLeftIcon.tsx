import React from "react"
import styled from "styled-components"

import theme from "../../utils/theme"

const Svg = styled.svg`
  path {
    fill: ${theme.secondary};
  }
`

export const ArrowLeftIcon = () => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      height="48"
      viewBox="0 96 960 960"
      width="48"
    >
      <path d="M480 896 160 576l320-320 42 42-248 248h526v60H274l248 248-42 42Z" />
    </Svg>
  )
}
