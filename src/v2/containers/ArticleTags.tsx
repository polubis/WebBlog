import React from "react"
import { Tags } from "../components/Tags"
import { useArticleProvider } from "../features/article/ArticleProvider"

const ArticleTags = () => {
    const {
        tags,
    } = useArticleProvider()

    return (
        <Tags>
            {tags.split(",").map(tag => (
                <h6 key={tag}>
                    {tag}
                </h6>
            ))}
        </Tags>
    )
}

export { ArticleTags }