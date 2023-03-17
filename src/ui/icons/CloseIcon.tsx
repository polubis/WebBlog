import React from "react"
import styled from "styled-components"

import theme from "../../utils/theme"

const Svg = styled.svg`
  path {
    fill: ${theme.secondary};
  }
`

const CloseIcon = () => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      height="48"
      viewBox="0 96 960 960"
      width="48"
    >
      <path d="m249 849-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z" />
    </Svg>
  )
}

export { CloseIcon }
