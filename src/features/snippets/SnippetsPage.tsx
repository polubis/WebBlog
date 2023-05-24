import React from "react"

import Layout from "../../components/layout/Layout"
import { SiteMeta } from "../../utils/SiteMeta"
import { Content } from "../../ui"
import { AllDataResponse } from "../../api"
import { SnippetsCreator } from "./SnippetsCreator"

interface SnippetsPageProps {
  pageContext: AllDataResponse
}

const SnippetsPage = ({
  pageContext: { articles, site, translationObject, footerArticles },
}: SnippetsPageProps) => {
  const t = translationObject["en"]

  return (
    <SiteMeta
      siteName={site.siteName}
      siteLang={site.langs.en.html}
      gaPage="snippets/"
      url="/snippets/"
      robots="index,follow"
      title={`${site.siteName} snippets creator: Use our tool to create a beautifully animated code snippets!`}
      description="Take advantage of the ability to generate links for other developers, gifs, and graphics with code for your social media."
      type="website"
      image="/icon-192x192.png"
    >
      <Layout articles={footerArticles} t={t} routes={site.routes}>
        <Content paddingY>
          <SnippetsCreator />
        </Content>
      </Layout>
    </SiteMeta>
  )
}

export default SnippetsPage
