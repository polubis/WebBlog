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
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M7.41 15.41L12 10.83L16.59 15.41L18 14L12 8L6 14L7.41 15.41Z" />
    </Svg>
  )
}
