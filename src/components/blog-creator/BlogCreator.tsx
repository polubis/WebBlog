import React, { useMemo, useEffect } from "react"
import { useState } from "react"
import { XL, M, Hint, X } from "../../ui/text"
import styled from "styled-components"
import Badge from "../article/Badge"
import theme from "../../utils/theme"
import BlogCreatorLayout from "./BlogCreatorLayout"
import { INIT_MDX } from "./config"
import Button from "../button/Button"
import { BlogPreview } from "./BlogPreview"
import { M_DOWN, T_DOWN } from "../../utils/viewport"
import { useJoinUsModal } from "../article/WithJoinUsModal"
import { EditableSnippet, useModal } from "../../ui"
import Loadable from "react-loadable"
import { Subject, debounceTime, distinctUntilChanged, tap } from "rxjs"

const FullScreenCreator = Loadable({
  loader: () => import("./FullScreenCreator").then(m => m.FullScreenCreator),
  loading: () => null,
})

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

  .ui-editable-snippet {
    overflow: unset !important;
  }

  @media ${T_DOWN} {
    width: 100%;
  }
`

const PreviewScroll = styled.div`
  display: flex;
  flex-flow: column;
  flex-shrink: 0;
  width: 48%;
  margin-left: 4%;
  padding-right: 24px;

  section {
    width: 100%;
  }

  @media ${T_DOWN} {
    width: 100%;
    max-height: 100%;
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

const ConnectedSubmitButton = () => {
  const ctx = useJoinUsModal()

  return <Button onClick={ctx.open}>SUBMIT ARTICLE</Button>
}

export default function () {
  const [mdx, setMdx] = useState(INIT_MDX)
  const [currentMdx, setCurrentMdx] = useState(mdx)
  const [hasErrors, setHasErrors] = useState(false)
  const { isOpen, open, close } = useModal()

  const mdxChanged = useMemo(() => new Subject<string>(), [])
  const mdxChanged$ = useMemo(() => mdxChanged.asObservable(), [])

  const handleChange = (value: string): void => {
    setMdx(value)
    setHasErrors(false)
    mdxChanged.next(value)
  }

  useEffect(() => {
    const sub = mdxChanged$
      .pipe(
        debounceTime(4000),
        tap(value => {
          setCurrentMdx(value)
        })
      )
      .subscribe()

    return () => {
      sub.unsubscribe()
    }
  }, [])

  if (isOpen) {
    return (
      <FullScreenCreator onClose={close}>
        <EditableSnippet value={mdx} onChange={handleChange} />
        <>
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
        </>
      </FullScreenCreator>
    )
  }

  return (
    <BlogCreatorLayout>
      <Heading>
        <XL>Article preview</XL>
        <Badge color={theme.green}>beta</Badge>
        <Button onClick={open}>FULL MODE</Button>
        <ConnectedSubmitButton />
      </Heading>
      <Container>
        <CodeContainer>
          <EditableSnippet value={mdx} onChange={handleChange} />
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

          <BlogPreview mdx={currentMdx} onError={() => setHasErrors(true)} />
        </PreviewScroll>
      </Container>
    </BlogCreatorLayout>
  )
}
