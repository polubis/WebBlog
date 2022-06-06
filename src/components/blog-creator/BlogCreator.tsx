import React, { memo, useEffect, useMemo, useRef } from "react"
import CodeMirror from "@uiw/react-codemirror/src"
import { markdown } from "@codemirror/lang-markdown"
import { useState } from "react"
import { XL, M, Hint, X } from "../../ui/Text"
import MDX from "@mdx-js/runtime"
import { debounceTime, distinctUntilChanged, Subject, tap } from "rxjs"
import styled from "styled-components"
import { ErrorBoundary } from "../../utils/ErrorBoundary"
import Badge from "../article/Badge"
import theme from "../../utils/theme"
import BlogCreatorLayout from "./BlogCreatorLayout"
import { COMPONENTS, TAGS, INIT_MDX } from "./config"
import Button from "../button/Button"

const Container = styled.div`
  display: flex;
  position: relative;
  height: 100%;
`

const CodeContainer = styled.div`
  display: flex;
  flex-flow: column;
  width: 48%;
  max-height: calc(100vh - 112px);
`

const CodeScroll = styled.div`
  display: flex;
  flex-flow: column;
  overflow-y: auto;
  width: 100%;
  height: 100%;
`

const PreviewScroll = styled.div`
  display: flex;
  flex-flow: column;
  flex-shrink: 0;
  width: 48%;
  overflow-y: auto;
  max-height: calc(100vh - 112px);
  margin-left: 4%;
  padding-right: 24px;

  ${XL} {
    margin-bottom: 32px;
  }

  ${M} {
    margin-bottom: 12px;
  }

  ${Hint} {
    margin: 24px 0 0 0;
  }
`

const Loader = styled.div`
  position: fixed;
  top: 22px;
  right: 0;
  left: 0;
  margin: 0 auto;
  z-index: 100;
  width: max-content;
`

const Errors = styled.div`
  display: flex;
  flex-flow: column;

  & > *:first-child {
    color: ${theme.error};
    margin-bottom: 12px;
  }
`

const Heading = styled.header`
  height: 112px;
  display: flex;
  align-items: center;

  & > :last-child {
    margin-left: auto;
  }
`

const SyntaxPreview = styled.div`
  display: flex;
  align-items: center;
  height: 52px;

  & > * {
    cursor: pointer;
    margin-right: 8px;
  }
`

const isUsedTag = (tagName: string, mdx: string): boolean => {
  const regExp = new RegExp(`<${tagName}`, "i")
  return regExp.test(mdx)
}

const Preview = memo(
  ({ mdx, onError }: { mdx: string; onError: () => void }) => (
    <ErrorBoundary
      key={mdx}
      fallback={() => <>Invalid format - please correct</>}
      onError={onError}
    >
      <MDX components={COMPONENTS}>{mdx}</MDX>
    </ErrorBoundary>
  ),
  (prev, curr) => prev.mdx === curr.mdx
)

const CurrentlyUsedTags = memo(
  ({ mdx }: { mdx: string }) => (
    <SyntaxPreview>
      {TAGS.map(tag => (
        <Badge
          key={tag}
          color={isUsedTag(tag, mdx) ? theme.green : theme.secondary}
        >
          {`<${tag}>`}
        </Badge>
      ))}
    </SyntaxPreview>
  ),
  (prev, curr) => prev.mdx === curr.mdx
)

export default function () {
  const change = useMemo(() => new Subject<string>(), [])
  const change$ = useMemo(() => change.asObservable(), [])

  const mdxTemp = useRef(INIT_MDX)
  const [mdx, setMdx] = useState(mdxTemp.current)
  const [checking, setChecking] = useState(false)
  const [hasErrors, setHasErrors] = useState(false)

  const handleChange = (value: string) => {
    mdxTemp.current = value
    change.next(value)
  }

  useEffect(() => {
    const sub = change$
      .pipe(
        tap(() => {
          setChecking(true)
          setHasErrors(false)
        }),
        debounceTime(1500),
        distinctUntilChanged(),
        tap(mdx => {
          setMdx(mdx)
          setChecking(false)
        })
      )
      .subscribe()

    return () => {
      sub.unsubscribe()
    }
  }, [])

  return (
    <BlogCreatorLayout>
      <Heading>
        <XL>Real time blog builder</XL>
        <Button>SUBMIT YOUR BLOG</Button>
      </Heading>
      <Container>
        <CodeContainer>
          <CodeScroll>
            <CodeMirror
              value={mdxTemp.current}
              extensions={[markdown()]}
              onChange={handleChange}
              theme="dark"
            />
          </CodeScroll>
          <CurrentlyUsedTags mdx={mdx} />
        </CodeContainer>

        <PreviewScroll>
          {hasErrors && (
            <Errors>
              <X>Errors detected.</X>
              <M>
                It may be caused by not supported tag usage, not closed tag or
                after {"<iframe></iframe>"} use.
              </M>
            </Errors>
          )}

          <Preview mdx={mdx} onError={() => setHasErrors(true)} />
        </PreviewScroll>

        {checking && (
          <Loader>
            <Badge color={theme.bg} background={theme.secondary}>
              Updating...
            </Badge>
          </Loader>
        )}
      </Container>
    </BlogCreatorLayout>
  )
}
