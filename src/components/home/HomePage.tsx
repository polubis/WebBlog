import React from "react"
import { SiteMeta } from "../../utils/SiteMeta"
import { AllDataResponse } from "../../api"
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
    translationObject,
    footerArticles,
  } = pageContext
  const t = translationObject["en"]

  return (
    <SiteMeta
      siteName={site.siteName}
      siteLang={site.langs.en.html}
      title={site.siteName}
      description={site.siteName + " - " + site.siteDescription}
      url={site.routes.home.to}
      gaPage={site.routes.home.gaPage}
      robots="index,follow"
      type="website"
      image="/icon-192x192.png"
    >
      <Layout discordUrl={site.discordUrl} articles={footerArticles} t={t} routes={site.routes}>
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
