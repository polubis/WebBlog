import React from "react"

import Layout from "../../components/layout/Layout"
import Grid from "../../components/article/Grid"
import { SiteMeta } from "../../utils/SiteMeta"
import { Content } from "../../ui"
import { AllDataResponse } from "../../api"
import { ArticlesJumbo } from "./ArticlesJumbo"
import { Image } from "../../models"
import { ArticlesProvider, useArticleProvider } from "./ArticlesProvider"
import { NoArticles } from "./NoArticles"
import Button from "../../components/button/Button"
import { useScrollToTop } from "../../utils/useScrollToTop"

interface ArticlesPageProps {
  pageContext: AllDataResponse & { bubblesImg: Image }
}

const ConnectedGrid = () => {
  const { filteredArticles, reset } = useArticleProvider()

  if (filteredArticles.length === 0) {
    return (
      <NoArticles>
        <Button onClick={reset}>Reset filters</Button>
      </NoArticles>
    )
  }

  return <Grid articles={filteredArticles} />
}

const ArticlesPage = ({
  pageContext: {
    articles,
    site,
    authors,
    translationObject,
    footerArticles,
    bubblesImg,
  },
}: ArticlesPageProps) => {
  const t = translationObject["en"]
  
  useScrollToTop()

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
      <ArticlesProvider articles={articles} authors={authors}>
        <Layout articles={footerArticles} t={t} routes={site.routes}>
          <ArticlesJumbo bubblesImg={bubblesImg} authors={authors} />
          <Content paddingY>
            <ConnectedGrid />
          </Content>
        </Layout>
      </ArticlesProvider>
    </SiteMeta>
  )
}

export type { ArticlesPageProps }

export default ArticlesPage
