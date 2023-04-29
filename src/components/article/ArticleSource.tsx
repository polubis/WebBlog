import React from "react"
import { EditableSnippet, Modal } from "../../ui"

type ArticleSourceProps = {
  source: string
  onClose?: () => void
}

const ArticleSource = ({ source, onClose }: ArticleSourceProps) => {
  const articleContent = source.replace(/^(---\s*\n[\s\S]*?\n?)?---\s*\n/, "")
  return (
    <Modal onClose={onClose}>
      <EditableSnippet value={articleContent} />
    </Modal>
  )
}

export type { ArticleSourceProps }
export { ArticleSource }
