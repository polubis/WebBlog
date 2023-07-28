import React from "react"

import { LayoutProvider } from "../../providers/LayoutProvider"
import { HomePageModel, Layout } from "../../core/models"
import { SEO } from "../../containers/SEO"
import { HomePageProvider } from "./HomePageProvider"
import { HomeView } from "./HomeView"

interface HomePageProps {
  pageContext: {
    home: HomePageModel
    layout: Layout
  }
}

const HomePage = ({ pageContext }: HomePageProps) => {
  const { home, layout } = pageContext

  return (
    <LayoutProvider initialState={layout}>
      <HomePageProvider initialState={home}>
        <SEO
          ga_page={home.ga_page}
          url={home.url}
          title={`${layout.site_name} ${home.t.page_title}`}
          type="website"
          image={layout.site_url + home.thumbnail.src}
          description={home.t.page_description}
        >
          <HomeView />
        </SEO>
      </HomePageProvider>
    </LayoutProvider>
  )
}

export default HomePage
