import React, { useLayoutEffect, useRef } from "react"
import styled from "styled-components"

import { S, M } from "../../ui"
import { isInSSR } from "../../utils/isInSSR"

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

const heightCache = {}

export default function ({ children, description }: Props): React.ReactElement {
  const ref = useRef<HTMLDivElement | null>(null)

  useLayoutEffect(() => {
    if (!isInSSR() && ref.current !== null) {
      const DELAY = 2000

      const oldRect = ref.current.getBoundingClientRect()

      const timeout = setTimeout(() => {
        const currRect = ref.current.getBoundingClientRect()

        if (currRect.height !== oldRect.height) {
          heightCache[description] = currRect.height
        }
      }, DELAY)

      return () => {
        clearTimeout(timeout)
      }
    }
  }, [ref])

  return (
    <Code>
      <div
        style={{
          minHeight: heightCache[description]
            ? heightCache[description] + "px"
            : undefined,
        }}
        ref={ref}
      >
        {children}
      </div>
      <S italic>{description}</S>
    </Code>
  )
}
