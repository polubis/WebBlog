import React from "react"
import { Modal, Snippet } from "../../ui"
import styled from "styled-components"

interface SourceModalProps {
  source: string
  onClose: () => void
}

const Wrapper = styled.div`
  max-width: 1080px;
`

const SourceModal = ({ source, onClose }: SourceModalProps) => {
  const content = source.replace(/^(---\s*\n[\s\S]*?\n?)?---\s*\n/, "")

  return (
    <Modal onClose={onClose}>
      <Wrapper>
        <Snippet>{content}</Snippet>
      </Wrapper>
    </Modal>
  )
}

export type { SourceModalProps }
export { SourceModal }
