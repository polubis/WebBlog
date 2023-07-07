import React from "react"
import {
  SiteName,
  SupportedGAPages,
  SupportedLangHTML,
  SupportedRoute,
} from "../models"
import { SiteMeta } from "../utils/SiteMeta"
import ArticlesView from "../v2-views/ArticlesView"
import { ArticlesViewProps } from "../v2-views/models"

interface ArticlesPage {
  pageContext: ArticlesViewProps
}

const ArticlesPage = ({ pageContext }: ArticlesPage) => {
  return (
    <SiteMeta
      siteName={"GreenOn Software" as SiteName}
      siteLang={"en-US" as SupportedLangHTML}
      gaPage={"articles" as SupportedGAPages}
      url={"/articles/" as SupportedRoute}
      robots="index,follow"
      title="Explore a Rich Collection of Articles: Your Gateway to Knowledge"
      description="
                Unlock a wealth of captivating articles on our page. Explore expertly curated content, covering diverse topics for enhanced knowledge. Discover now!"
      type="website"
      image="/icon-192x192.png"
    >
      <ArticlesView {...pageContext} />
    </SiteMeta>
  )
}

export default ArticlesPage
