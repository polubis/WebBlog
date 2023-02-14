import React, { memo, useEffect, useMemo } from "react"
import { useState } from "react"
import { XL, M, Hint, X } from "../../ui/text"
import { debounceTime, Subject, tap } from "rxjs"
import styled from "styled-components"
import Badge from "../article/Badge"
import theme from "../../utils/theme"
import BlogCreatorLayout from "./BlogCreatorLayout"
import { TAGS, INIT_MDX } from "./config"
import Button from "../button/Button"
import { BlogPreview } from "./BlogPreview"
import { Code } from "./Code"
import { M_DOWN, T_DOWN } from "../../utils/viewport"
import { useJoinUsModal, WithJoinUsModal } from "../article/WithJoinUsModal"

const Container = styled.div`
  display: flex;
  position: relative;
  height: 100%;

  @media ${T_DOWN} {
    flex-flow: column;
  }
`

const CodeContainer = styled.div`
  display: flex;
  flex-flow: column;
  width: 48%;
  max-height: calc(100vh - 112px);

  @media ${T_DOWN} {
    width: 100%;
    max-height: 100%;
    height: 600px;
  }
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

  section {
    width: 100%;
  }

  @media ${T_DOWN} {
    width: 100%;
    max-height: 100%;
    overflow-y: unset;
    padding-right: 0;
    margin-left: 0;
    padding-top: 42px;
    padding-bottom: 42px;
  }

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
  flex-shrink: 0;
  align-items: center;

  ${XL} {
    margin-right: 10px;
  }

  @media ${M_DOWN} {
    ${XL} {
      display: none;
    }

    ${Badge} {
      display: none;
    }
  }

  & > :last-child {
    margin-left: auto;
  }
`

const SyntaxPreview = styled.div`
  display: flex;
  align-items: center;
  flex-flow: wrap;

  @media ${T_DOWN} {
    display: none;
  }

  & > * {
    cursor: pointer;
    margin: 0 8px 8px 0;
  }
`

const isUsedTag = (tagName: string, mdx: string): boolean => {
  const regExp = new RegExp(`<${tagName}`, "i")
  return regExp.test(mdx)
}

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

const ConnectedSubmitButton = ({ disabled }: { disabled: boolean }) => {
  const ctx = useJoinUsModal()

  return (
    <Button disabled={disabled} onClick={ctx.open}>
      SUBMIT YOUR BLOG
    </Button>
  )
}

export default function () {
  const change = useMemo(() => new Subject<string>(), [])
  const change$ = useMemo(() => change.asObservable(), [])

  const [mdx, setMdx] = useState(INIT_MDX)
  const [checking, setChecking] = useState(false)
  const [hasErrors, setHasErrors] = useState(false)

  const handleChange = (value: string) => {
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
    <WithJoinUsModal>
      <BlogCreatorLayout>
        <Heading>
          <XL>Blog creator</XL>
          <Badge color={theme.green}>beta</Badge>
          <ConnectedSubmitButton disabled={checking} />
        </Heading>
        <Container>
          <CodeContainer>
            <CodeScroll>
              <Code
                id="blog-creator-code"
                code={INIT_MDX}
                onChange={handleChange}
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

            <BlogPreview mdx={mdx} onError={() => setHasErrors(true)} />
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
    </WithJoinUsModal>
  )
}
