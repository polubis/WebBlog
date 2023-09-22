import React, { lazy, Suspense } from "react"

import { LayoutProvider } from "../../providers/LayoutProvider"
import { BlogCreatorPageModel, Layout as LayoutModal } from "../../core/models"
import { SEO } from "../../containers/SEO"
import Layout from "../../containers/Layout"
import { Content } from "../../../ui"
import { isInSSR } from "../../../utils/isInSSR"

const BlogCreatorView = lazy(() => import("./BlogCreatorView"))

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
            {isInSSR() || (
              <Suspense>
                <BlogCreatorView {...creator} />
              </Suspense>
            )}
          </SEO>
        </Content>
      </Layout>
    </LayoutProvider>
  )
}

export default BlogCreatorPage
