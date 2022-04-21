import React from "react"
import styled from "styled-components"

import theme from "../../../utils/theme"

const CommentsIcon = styled.svg`
  path {
    fill: ${theme.secondary};
  }
`

export default function (): React.ReactElement {
  return (
    <CommentsIcon
      xmlns="http://www.w3.org/2000/svg"
      height="48"
      viewBox="0 0 48 48"
      width="48"
    >
      <path d="M12 28H36V25H12ZM12 21.5H36V18.5H12ZM12 15H36V12H12ZM44 44 36 36H7Q5.85 36 4.925 35.075Q4 34.15 4 33V7Q4 5.85 4.925 4.925Q5.85 4 7 4H41Q42.2 4 43.1 4.925Q44 5.85 44 7ZM7 7V33Q7 33 7 33Q7 33 7 33H37.25L41 36.75V7Q41 7 41 7Q41 7 41 7H7Q7 7 7 7Q7 7 7 7ZM7 7V36.75V33Q7 33 7 33Q7 33 7 33V7Q7 7 7 7Q7 7 7 7Q7 7 7 7Q7 7 7 7Z" />
    </CommentsIcon>
  )
}
