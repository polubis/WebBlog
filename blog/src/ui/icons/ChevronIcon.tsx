import React from "react"
import styled from "styled-components"

import theme from "../../utils/theme"

const Svg = styled.svg`
  path {
    fill: ${theme.secondary};
  }
`

export const ChevronIcon = () => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      height="48"
      viewBox="0 96 960 960"
      width="48"
    >
      <path d="M480 711 240 471l43-43 197 198 197-197 43 43-240 239Z" />
    </Svg>
  )
}
