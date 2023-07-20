import React from "react"
import { Tags } from "../components/Tags"
import { useArticleProvider } from "../features/article/ArticleProvider"

const ArticleTags = () => {
    const {
        article: { tags },
    } = useArticleProvider()

    return (
        <Tags>
            {tags.split(",").map(tag => (
                <h6 key={tag} className="tag">
                    {tag}
                </h6>
            ))}
        </Tags>
    )
}

export { ArticleTags }
