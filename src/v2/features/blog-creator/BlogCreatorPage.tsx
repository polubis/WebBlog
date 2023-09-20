import React from "react"

import { LayoutProvider } from "../../providers/LayoutProvider"
import { BlogCreatorPageModel, Layout as LayoutModal } from "../../core/models"
import { SEO } from "../../containers/SEO"
import Loadable from 'react-loadable'
import Layout from "../../containers/Layout"
import { Content } from "../../../ui"

const BlogCreatorView = Loadable({
  loader: () => import('./BlogCreatorView').then(m => m.BlogCreatorView),
  loading: () => null,
})

interface BlogCreatorPageProps {
  pageContext: {
    creator: BlogCreatorPageModel
    layout: LayoutModal
  }
}

const BlogCreatorPage = ({ pageContext }: BlogCreatorPageProps) => {
  const { creator, layout } = pageContext

  return (
    <LayoutProvider initialState={layout}>
      <Layout>
        <Content paddingY>
          <SEO
            ga_page={creator.ga_page}
            url={creator.url}
            title={`${layout.site_name} ${creator.t.page_title}`}
            type="website"
            image={layout.site_url + "/icon-192x192.png"}
            description={creator.t.page_description}
          >
            <BlogCreatorView {...creator} />
          </SEO>
        </Content>
      </Layout>
    </LayoutProvider>
  )
}

export default BlogCreatorPage
