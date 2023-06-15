import React, { useMemo } from "react"
import Button from "../button/Button"
import { Article } from "../../models"
import { useFavouriteArticlesProvider } from "./FavouriteArticlesProvider"

const ArticleFavoritesSection = ({ article }: { article: Article }) => {
    const { articles, add, remove, isAdded } = useFavouriteArticlesProvider()

    const isArticleAlreadyInFavourites = useMemo(() => isAdded(article.title), [
        articles,
        article,
    ])

    return isArticleAlreadyInFavourites ? (
        <Button className="remove-favourites-btn" onClick={() => remove(article.title)}>Remove from favourite</Button>
    ) : (
        <Button className="add-favourites-btn" onClick={() => add(article)}>Add to favourite</Button>
    )
}

export { ArticleFavoritesSection }
