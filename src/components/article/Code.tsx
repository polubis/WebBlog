import React from "react"
import styled from "styled-components"

import { S, M } from "../../ui"

const Code = styled.div`
  margin-top: 24px;
  max-width: calc(100vw - 56px);

  .deckgo-highlight-code-carbon {
    margin: 0;
  }

  ${S} {
    display: block;
    margin-top: 12px;
  }

  & + ${M} {
    margin-top: 24px;
  }
`

interface Props {
  children: React.ReactNode
  description: string
}

export default function ({ children, description }: Props): React.ReactElement {
  return (
    <Code>
      {children}
      <S italic>{description}</S>
    </Code>
  )
}
