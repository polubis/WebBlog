import React from "react"
import { AllDataResponse } from "../../api"
import { SiteMeta } from "../../utils/SiteMeta"
import Layout from "../../components/layout/Layout"
import { Content } from "../../ui"
import { Material } from "../../models"
import { MDXRenderer } from "gatsby-plugin-mdx"

interface MaterialPageProps {
  pageContext: { material: Material } & AllDataResponse
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
      title={`${site.siteName} materials: Place where you can find and use any content for learning.`}
      type="website"
      image="/icon-192x192.png"
      description="Browse materials which has been created during presentations or articles creation."
    >
      <Layout t={t} articles={footerArticles} routes={site.routes}>
        <Content paddingY>
          <MDXRenderer>{material.body}</MDXRenderer>
        </Content>
      </Layout>
    </SiteMeta>
  )
}

export default MaterialPage
