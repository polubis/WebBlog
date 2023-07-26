import React from "react"
import { AllDataResponse } from "../../api"
import { SiteMeta } from "../../utils/SiteMeta"
import Layout from "../../components/layout/Layout"
import { Content } from "../../ui"
import BlogCreator from "../../components/blog-creator/BlogCreator"

interface BlogCreatorPageProps {
  pageContext: AllDataResponse
}

const BlogCreatorPage = ({
  pageContext: { site, translationObject, footerArticles },
}: BlogCreatorPageProps) => {
  const t = translationObject["en"]

  return (
    <SiteMeta
      siteName={site.siteName}
      siteLang={site.langs.en.html}
      gaPage={site.routes.creator.gaPage}
      url={site.routes.creator.to}
      robots="index,follow"
      title={`${site.siteName} creator: Tool for creating articles based on mdx syntax.`}
      type="website"
      image="/icon-192x192.png"
      description="Use our tool to create articles and courses in a fast, developer-friendly way."
    >
      <Layout articles={footerArticles} t={t} routes={site.routes}>
        <Content paddingY>
          <h1 style={{ visibility: "hidden", height: 0, margin: "0" }}>
            A powerful editor for articles
          </h1>
          <BlogCreator />
        </Content>
      </Layout>
    </SiteMeta>
  )
}

export type { BlogCreatorPage }

export default BlogCreatorPage
