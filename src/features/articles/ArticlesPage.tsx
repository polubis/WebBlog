import React from "react"

import Layout from "../../components/layout/Layout"
import Grid from "../../components/article/Grid"
import { SiteMeta } from "../../utils/SiteMeta"
import { Content } from "../../ui"
import { AllDataResponse } from "../../api"

interface ArticlesPageProps {
  pageContext: AllDataResponse
}

const ArticlesPage = ({ pageContext: { articles } }: ArticlesPageProps) => {
  return (
    <SiteMeta
      gaPage="articles"
      url="articles/"
      robots="index,follow"
      title="GreenOn Software articles"
      type="website"
      image="/icon-192x192.png"
      description="A blog created to share programming knowledge in a easy way."
    >
      <Layout articles={articles}>
        <Content paddingY>
          <Grid articles={articles} />
        </Content>
      </Layout>
    </SiteMeta>
  )
}

export type { ArticlesPageProps }

export default ArticlesPage
