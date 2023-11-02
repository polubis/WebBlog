import React from "react"
import { Tags } from "../components/Tags"
import { useArticleProvider } from "../providers/ArticleProvider"

const ArticleTags = () => {
  const {
    state: { tags },
  } = useArticleProvider()

  return (
    <Tags>
      {tags.map(tag => (
        <h6 key={tag}>{tag}</h6>
      ))}
    </Tags>
  )
}

export { ArticleTags }
