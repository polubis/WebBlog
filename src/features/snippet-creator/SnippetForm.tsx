import React, { ReactNode } from "react"
import styled from "styled-components"
import { EditableSnippet, Modal, XL } from "../../ui"
import Button from "../../components/button/Button"
import { useEditor } from "../../components/blog-creator/useEditor"
import { SM_DOWN } from "../../utils/viewport"

const Container = styled.div`
  display: flex;
  flex-flow: column;
  width: 400px;
  height: 86vh;

  @media ${SM_DOWN} {
    width: 100%;
  }

  ${XL} {
    margin-bottom: 40px;
  }

  pre {
    margin-bottom: 40px !important;
  }

  button {
    margin-top: auto;
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

  return (
    <Modal onClose={onClose}>
      <Container>
        <XL>{header}</XL>
        <EditableSnippet language="jsx" value={mdx} onChange={change} />
        <Button onClick={() => onSubmit(mdx)}>Confirm</Button>
      </Container>
    </Modal>
  )
}

export { SnippetForm }
