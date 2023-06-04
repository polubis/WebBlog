import React from "react"

import Layout from "../../components/layout/Layout"
import { SiteMeta } from "../../utils/SiteMeta"
import { Content } from "../../ui"
import { AllDataResponse } from "../../api"
import { SnippetCreator } from "./SnippetCreator"

interface SnippetCreatorPageProps {
  pageContext: AllDataResponse
}

const SnippetCreatorPage = ({
  pageContext: { site, translationObject, footerArticles },
}: SnippetCreatorPageProps) => {
  const t = translationObject["en"]

  return (
    <SiteMeta
      siteName={site.siteName}
      siteLang={site.langs.en.html}
      gaPage="snippet-creator"
      url="/snippet-creator/"
      robots="index,follow"
      title={`${site.siteName} animated snippet creator: Use our tool to create a beautifully animated code snippet!`}
      description="Take advantage of the ability to generate links for other developers, gifs, and graphics with code for your social media."
      type="website"
      image="/icon-192x192.png"
    >
      <Layout disableSocialBar articles={footerArticles} t={t} routes={site.routes}>
        <Content paddingY>
          <SnippetCreator />
        </Content>
      </Layout>
    </SiteMeta>
  )
}

export default SnippetCreatorPage
