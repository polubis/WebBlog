import React from "react"
import { SiteMeta } from "../../utils/SiteMeta"
import { AllDataResponse } from "../../api/getAllData"
import Layout from "../layout/Layout"
import { BlackHoleSection } from "./BlackHoleSection"
import { WelcomeSection } from "./WelcomeSection"
import { StatsSection } from "./StatsSection"
import { ArticlesTimelineSection } from "./ArticlesTimelineSection"

interface HomePageProps {
  pageContext: AllDataResponse
}

const HomePage = ({ pageContext }: HomePageProps) => {
  const { articles, authors, courses, totalLessons, timeline } = pageContext

  return (
    <SiteMeta
      gaPage=""
      url=""
      robots="index,follow"
      title="GreenOn Software"
      type="website"
      image="/icon-192x192.png"
      description="A place for people who love programming and personal development."
    >
      <Layout articles={articles}>
        <BlackHoleSection />
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
