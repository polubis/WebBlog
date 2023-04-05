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
  pageContext: { articles },
}: BlogCreatorPageProps) => {
  return (
    <SiteMeta
      gaPage="blog-creator"
      url="blog-creator/"
      robots="index,follow"
      title="Blog creator"
      type="website"
      image="/icon-192x192.png"
      description="Join the community and create your first article in a fast and fun way."
    >
      <Layout articles={articles}>
        <Content paddingY>
          <BlogCreator />
        </Content>
      </Layout>
    </SiteMeta>
  )
}

export type { BlogCreatorPage }

export default BlogCreatorPage
