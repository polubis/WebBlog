import React from "react"
import { AllDataResponse } from "../../api"
import { SiteMeta } from "../../utils/SiteMeta"
import Layout from "../../components/layout/Layout"
import { Content, Snippet } from "../../ui"
import { Material } from "../../models"
import { MdxProvider } from "../../v2/providers/MdxProvider"

interface MaterialPageProps {
  pageContext: { material: Material } & AllDataResponse
}

const components = {
  Snippet
}

const MaterialPage = ({
  pageContext: { material, translationObject, site, footerArticles },
}: MaterialPageProps) => {
  const t = translationObject["en"]

  return (
    <SiteMeta
      siteName={site.siteName}
      siteLang={site.langs.en.html}
      gaPage={material.gaPage}
      url={material.gaPage + "/"}
      robots="index,follow"
      title={material.title}
      type="website"
      image="/icon-192x192.png"
      description="Browse materials which has been created during presentations or articles creation."
    >
      <Layout t={t} articles={footerArticles} routes={site.routes}>
        <Content paddingY>
          <MdxProvider components={components}>
            {material.body}
          </MdxProvider>
        </Content>
      </Layout>
    </SiteMeta>
  )
}

export default MaterialPage
