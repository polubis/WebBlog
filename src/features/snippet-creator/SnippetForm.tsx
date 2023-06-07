import React, { ReactNode } from "react"
import styled from "styled-components"
import { EditableSnippet, XL } from "../../ui"
import Button from "../../components/button/Button"
import { useEditor } from "../../components/blog-creator/useEditor"
import { SM_DOWN } from "../../utils/viewport"

const Container = styled.div`
  @media ${SM_DOWN} {
    width: 100%;
  }

  ${XL} {
    margin-bottom: 24px;
  }

  pre {
    margin-bottom: 40px !important;
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

  return (
    <Container>
      <XL>{header}</XL>
      <EditableSnippet language="jsx" value={mdx} onChange={change} />
      <footer>
        <Button onClick={onClose}>Back</Button>
        <Button onClick={() => onSubmit(mdx)}>Confirm</Button>
      </footer>
    </Container>
  )
}

export { SnippetForm }
