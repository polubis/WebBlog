import React from "react"
import { Modal, Snippet } from "../../ui"
import styled from "styled-components"

interface ArticleSourceProps {
  source: string
  onClose: () => void
}

const Wrapper = styled.div`
  max-width: 1080px;
`

const ArticleSource = ({ source, onClose }: ArticleSourceProps) => {
  const articleContent = source.replace(/^(---\s*\n[\s\S]*?\n?)?---\s*\n/, "")

  return (
    <Modal onClose={onClose}>
      <Wrapper>
        <Snippet>{articleContent}</Snippet>
      </Wrapper>
    </Modal>
  )
}

export type { ArticleSourceProps }
export { ArticleSource }
