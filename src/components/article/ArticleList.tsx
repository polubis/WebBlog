import React, { useEffect, useState } from "react"

import Layout from "../../components/layout/Layout"

import { SiteMeta } from "../../utils/SiteMeta"
import { Content } from "../../ui"
import { AllDataResponse } from "../../api"
import { Article as ArticleModel } from "../../models/Article"

import Tile from "./Tile"

interface ArticlesPageProps {
  pageContext: AllDataResponse
}

const ArticleList = ({
  pageContext: { site, translationObject, footerArticles },
}: ArticlesPageProps) => {
  const t = translationObject["en"]

  const [favourites, setFavourites] = useState<ArticleModel[]>([])

  useEffect(() => {
    const favouriteProducts = localStorage.getItem("favouritesArticle")
    if (favouriteProducts) {
      const parsedProduct = JSON.parse(favouriteProducts)
      setFavourites(parsedProduct)
    }
  }, [])

  return (
    <SiteMeta
      siteName={site.siteName}
      siteLang={site.langs.en.html}
      gaPage={site.routes.articles.gaPage}
      url={site.routes.articles.to}
      robots="index,follow"
      title={`${site.siteName} articles: Learn with us.`}
      description="Browse through our articles and find something suitable for you."
      type="website"
      image="/icon-192x192.png"
    >
      <Layout articles={footerArticles} t={t} routes={site.routes}>
        <Content paddingY>
          <h1>strona</h1>
          <div>
            {favourites.length ? (
              favourites?.map(product => (
                <Tile key={product.slug} article={product} />
              ))
            ) : (
              <div>
                <span>You don't have a favourite articles</span>
              </div>
            )}
          </div>
        </Content>
      </Layout>
    </SiteMeta>
  )
}

export type { ArticlesPageProps }

export default ArticleList
