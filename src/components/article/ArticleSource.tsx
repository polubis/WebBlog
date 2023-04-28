import React from "react"
import { EditableSnippet, Modal } from "../../ui"

type ArticleSourceProps = {
  source: string
  onClose?: () => void
}

const ArticleSource = ({ source, onClose }: ArticleSourceProps) => {
  return (
    <Modal onClose={onClose}>
      <EditableSnippet value={source} />
    </Modal>
  )
}

export type { ArticleSourceProps }
export { ArticleSource }
