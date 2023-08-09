import React from "react"

import { LayoutProvider } from "../../providers/LayoutProvider"
import type {
  Layout as LayoutModel,
  SnippetCreatorPageModel,
} from "../../core/models"
import { SEO } from "../../containers/SEO"
import { SnippetCreatorPageProvider } from "./SnippetCreatorPageProvider"
import { SnippetCreatorView } from "./SnippetCreatorView"
import Layout from "../../containers/Layout"
import { Content } from "../../../ui"

interface SnippetCreatorPageProps {
  pageContext: {
    creator: SnippetCreatorPageModel
    layout: LayoutModel
  }
}

const SnippetCreatorPage = ({ pageContext }: SnippetCreatorPageProps) => {
  const { creator, layout } = pageContext

  return (
    <LayoutProvider initialState={layout}>
      <SnippetCreatorPageProvider initialState={creator}>
        <SEO
          ga_page={creator.ga_page}
          url={creator.url}
          title={`${layout.site_name} ${creator.t.page.title}`}
          type="website"
          image={layout.site_url + "/icon-192x192.png"}
          description={creator.t.page.description}
        >
          <SnippetCreatorView
            layout={children => (
              <Layout>
                <Content paddingY>
                  <h1
                    style={{
                      visibility: "hidden",
                      opacity: 0,
                      position: "absolute",
                      width: 0,
                      height: 0,
                    }}
                  >
                    {creator.t.page.title}
                  </h1>
                  {children}
                </Content>
              </Layout>
            )}
          />
        </SEO>
      </SnippetCreatorPageProvider>
    </LayoutProvider>
  )
}

export default SnippetCreatorPage
