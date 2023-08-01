import React, { ReactNode, useMemo } from "react"
import styled from "styled-components"
import { SM_DOWN } from "../../../../utils/viewport"
import { Banner, XL } from "../../../../ui"
import { useEditor } from "../../../logic/useEditor"
import {
  MAX_FRAME_CHARACTERS,
  MAX_FRAME_LINES,
  MIN_FRAME_CODE_CHARACTERS,
} from "../core/config"
import { Center } from "../components/Center"
import Button from "../../../../components/button/Button"
import { useKeyPress } from "../../../../utils/useKeyPress"
import { useLayoutProvider } from "../../../providers/LayoutProvider"
import { useSnippetCreatorPageProvider } from "../SnippetCreatorPageProvider"
import { EditableSnippet } from "../../../../ui/snippet/EditableSnippet"

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
  const layout = useLayoutProvider()
  const creator = useSnippetCreatorPageProvider()
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
            {creator.t.sandbox.validation.empty}
          </Banner>
        )}

        {maxCharactersExceeded && (
          <Banner className="snippet-form-banner">
            {creator.t.sandbox.validation.max_chars_count}{" "}
            {MAX_FRAME_CHARACTERS}.
          </Banner>
        )}

        {maxLinesExceeded && (
          <Banner className="snippet-form-banner">
            {creator.t.sandbox.validation.max_lines_count} {MAX_FRAME_LINES}.
          </Banner>
        )}

        <footer className="footer">
          <Button onClick={onClose} title={layout.t.back}>
            {layout.t.back}
          </Button>
          <Button
            disabled={disabled}
            title={layout.t.confirm}
            onClick={handleSubmit}
          >
            {layout.t.confirm}
          </Button>
        </footer>
      </Container>
    </Center>
  )
}

export { SnippetForm }
