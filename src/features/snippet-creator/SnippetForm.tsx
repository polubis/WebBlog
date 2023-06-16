import React, { ReactNode } from "react"
import styled from "styled-components"
import { EditableSnippet, XL } from "../../ui"
import Button from "../../components/button/Button"
import { useEditor } from "../../components/blog-creator/useEditor"
import { SM_DOWN } from "../../utils/viewport"
import { Center } from "./Center"
import { useKeyPress } from "../../utils/useKeyPress"

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
    max-width: 500px;
  }

  button {
    margin-top: auto;
  }

  footer {
    display: flex;
    justify-content: space-between;
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

  return (
    <Center>
      <Container>
        <XL>{header}</XL>
        <EditableSnippet language="jsx" value={mdx} onChange={change} />
        <footer>
          <Button onClick={onClose}>Back</Button>
          <Button onClick={handleSubmit}>Confirm</Button>
        </footer>
      </Container>
    </Center>
  )
}

export { SnippetForm }
