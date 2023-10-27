import React from "react"
import { Tags } from "../components/Tags"
import { useArticlePageProvider } from "../features/article/ArticlePageProvider"

const ArticleTags = () => {
    const {
        tags,
    } = useArticlePageProvider()

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