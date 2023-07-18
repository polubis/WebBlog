import React, { ReactNode, useMemo } from "react"
import styled from "styled-components"
import { Banner, XL } from "../../ui"
import Button from "../../components/button/Button"
import { useEditor } from "../../components/blog-creator/useEditor"
import { SM_DOWN } from "../../utils/viewport"
import { Center } from "./Center"
import { useKeyPress } from "../../utils/useKeyPress"
import {
  MAX_FRAME_CHARACTERS,
  MAX_FRAME_LINES,
  MIN_FRAME_CODE_CHARACTERS,
} from "./consts"
import Loadable from "react-loadable"

const EditableSnippet = Loadable({
  loader: () =>
    import("../../ui/snippet/EditableSnippet").then(m => m.EditableSnippet),
  loading: () => null,
})

const Container = styled.div`
  @media ${SM_DOWN} {
    width: 100%;
  }

  ${XL} {
    margin-bottom: 24px;
  }

  pre {
    margin-bottom: 40px !important;
    min-width: 280px;
    max-width: 420px;
  }

  button {
    margin-top: auto;
  }

  .snippet-form-banner {
    & + .snippet-form-banner {
      margin-top: 20px;
    }

    & + footer {
      margin-top: 32px;
    }
  }
`

interface SnippetFormProps {
  initialMdx: string
  header: ReactNode
  onSubmit: (mdx: string) => void
  onClose: () => void
}

const SnippetForm = ({
  initialMdx,
  header,
  onSubmit,
  onClose,
}: SnippetFormProps) => {
  const [{ mdx }, { change }] = useEditor(initialMdx)

  const handleSubmit = () => {
    onSubmit(mdx)
  }

  useKeyPress({
    onKeyPress: e => {
      const actions = {
        escape: onClose,
      }

      actions[e.key.toLowerCase()]?.()
    },
  })

  const notEnoughCharacters = useMemo(
    () => mdx.trim().length < MIN_FRAME_CODE_CHARACTERS,
    [mdx]
  )

  const maxCharactersExceeded = useMemo(
    () => mdx.length > MAX_FRAME_CHARACTERS,
    [mdx]
  )

  const maxLinesExceeded = useMemo(
    () => mdx.split("\n").length > MAX_FRAME_LINES,
    [mdx]
  )

  const disabled = maxCharactersExceeded || maxLinesExceeded

  return (
    <Center>
      <Container>
        <XL>{header}</XL>
        <EditableSnippet language="jsx" value={mdx} onChange={change} />

        {notEnoughCharacters && (
          <Banner className="snippet-form-banner">
            Code snippet cannot be empty.
          </Banner>
        )}

        {maxCharactersExceeded && (
          <Banner className="snippet-form-banner">
            The character limit has been exceeded. Maximum characters count is:{" "}
            {MAX_FRAME_CHARACTERS}.
          </Banner>
        )}

        {maxLinesExceeded && (
          <Banner className="snippet-form-banner">
            The allowed number of lines of code has been exceeded. Maximum
            number of lines: {MAX_FRAME_LINES}.
          </Banner>
        )}

        <footer className="footer">
          <Button onClick={onClose}>Back</Button>
          <Button disabled={disabled} onClick={handleSubmit}>
            Confirm
          </Button>
        </footer>
      </Container>
    </Center>
  )
}

export { SnippetForm }
