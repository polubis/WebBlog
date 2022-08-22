import React, {
  useEffect,
  useState,
  useRef,
  useLayoutEffect,
  ReactNode,
} from "react"
import { from } from "rxjs"
import { isInSSR } from "../../utils/isInSSR"
import styled from "styled-components"
import { S, M } from "../../ui"
import theme from "../../utils/theme"
import { M_UP } from "../../utils/viewport"

const heightCache = {}

const CodeEl = styled.div`
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

const Wrapper = styled.div`
  position: relative;

  ${M} {
    position: absolute;
    right: 8px;
    top: 3px;
    color: ${theme.green};
    margin-bottom: 0;
    display: none;

    @media ${M_UP} {
      display: block;
    }
  }
`

const getFileName = (src: string) => {
  const parts = src.split("/")
  return parts[parts.length - 1]
}

export const Code = ({
  description,
  src,
  preserveHeight = false,
  children,
}: {
  description: string
  src: string
  preserveHeight?: boolean
  children?: (content: string) => ReactNode
}) => {
  const [content, setContent] = useState("")
  const ref = useRef<HTMLDivElement | null>(null)

  useLayoutEffect(() => {
    if (!isInSSR() && preserveHeight && ref.current !== null) {
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

  useEffect(() => {
    if (!isInSSR()) {
      const obs$ = from(
        fetch(src).then(res => res.text()) as Promise<string>
      ).subscribe(content => {
        setContent(content)
      })

      return () => {
        obs$.unsubscribe()
      }
    }
  }, [])

  if (!content || isInSSR()) {
    return null
  }

  return (
    <CodeEl>
      <Wrapper
        style={{
          minHeight: heightCache[description]
            ? heightCache[description] + "px"
            : undefined,
        }}
        ref={ref}
      >
        <M>{getFileName(src)}</M>

        {children ? (
          children(content)
        ) : (
          <deckgo-highlight-code src={src}></deckgo-highlight-code>
        )}
      </Wrapper>
      <S italic>{description}</S>
    </CodeEl>
  )
}
