import React from "react"
import { SiteMeta } from "../../utils/SiteMeta"
import { removeEdgeSlashes } from "../../utils/removeEdgeSlashses"
import { Lesson } from "../../models"
import { XXL } from "../../ui"

interface Props {
  pageContext: {
    lesson: Lesson
  }
}

export default function ({ pageContext: { lesson } }: Props) {
  return (
    <SiteMeta
      gaPage={removeEdgeSlashes(lesson.path)}
      url={lesson.path}
      robots="index,follow,max-image-preview:large"
      title={lesson.name}
      type="article"
      author={"TODO"}
      description="TODO"
    >
      <XXL>siema</XXL>
    </SiteMeta>
  )
}
