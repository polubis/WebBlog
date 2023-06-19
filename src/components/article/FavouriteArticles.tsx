import React, { useEffect, useState } from "react"
import { AllDataResponse } from "../../api"
import { Article as ArticleModel } from "../../models/Article"
import Tile from "./Tile"
import { Modal } from "../../ui"
import styled from "styled-components"

const Txt = styled.div`
  color: #ffff;
`

export interface ArticlesPageProps {
  pageContext: AllDataResponse
}

export interface FavouriteArticlesModalProps {
  onClose: () => void
}

export const FavouriteArticles = ({ onClose }: FavouriteArticlesModalProps) => {
  const [favourites, setFavourites] = useState<ArticleModel[]>([])

  const handleClose = () => {
    onClose()
  }

  useEffect(() => {
    const favouriteProducts = localStorage.getItem("favouritesArticle")
    if (favouriteProducts) {
      const parsedProduct = JSON.parse(favouriteProducts)
      setFavourites(parsedProduct)
    }
  }, [])

  return (
    <>
      <Modal onClose={handleClose}>
        {favourites.length ? (
          favourites?.map(product => (
            <Tile key={product.slug} article={product} />
          ))
        ) : (
          <Txt>You don't have any favourite articles</Txt>
        )}
      </Modal>
    </>
  )
}
