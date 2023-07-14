import React from "react"
import { Modal, Snippet } from "../../ui"

interface ArticleSourceProps {
  source: string
  onClose: () => void
}

const ArticleSource = ({ source, onClose }: ArticleSourceProps) => {
  const articleContent = source.replace(/^(---\s*\n[\s\S]*?\n?)?---\s*\n/, "")

  return (
    <Modal onClose={onClose}>
      <Snippet>{articleContent}</Snippet>
    </Modal>
  )
}

export { ArticleSource }
