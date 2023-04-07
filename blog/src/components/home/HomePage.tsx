import React from "react"
import { SiteMeta } from "../../utils/SiteMeta"
import { AllDataResponse } from "../../api/getAllData"
import Layout from "../layout/Layout"
import { BlackHoleSection } from "./BlackHoleSection"
import { WelcomeSection } from "./WelcomeSection"
import { StatsSection } from "./StatsSection"
import { ArticlesTimelineSection } from "./ArticlesTimelineSection"
import { Image } from "../../models"

interface HomePageProps {
  pageContext: {
    holeImg: Image
  } & AllDataResponse
}

const HomePage = ({ pageContext }: HomePageProps) => {
  const {
    articles,
    authors,
    courses,
    totalLessons,
    timeline,
    holeImg,
    site,
  } = pageContext

  return (
    <SiteMeta
      siteName={site.siteName}
      siteLang={site.siteLang}
      title={site.siteName}
      description={site.siteName + " - " + site.siteDescription}
      url={site.routes.home.fullTo}
      gaPage={site.routes.home.gaPage}
      robots="index,follow"
      type="website"
      image="/icon-192x192.png"
    >
      <Layout articles={articles}>
        <BlackHoleSection holeImg={holeImg} />
        <WelcomeSection />
        <StatsSection
          articlesCount={articles.length}
          authorsCount={authors.length}
          coursesCount={courses.length}
          lessonsCount={totalLessons}
          topAuthor={authors[0]}
        />
        <ArticlesTimelineSection data={timeline} />
      </Layout>
    </SiteMeta>
  )
}

export type { HomePageProps }

export default HomePage
