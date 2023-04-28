import React from "react"
import { AllDataResponse } from "../../api"
import styled from "styled-components"
import { SiteMeta } from "../../utils/SiteMeta"
import Layout from "../../components/layout/Layout"
import { Content } from "../../ui"
import { CourseTile } from "./components"

const Grid = styled.div`
  display: flex;
  gap: 32px;
  flex-flow: wrap;
  justify-content: center;

  & > * {
    width: 100%;
    max-width: 420px;
  }
`

interface CoursesPageProps {
  pageContext: AllDataResponse
}

const CoursesPage = ({
  pageContext: { courses, articles, site, translationObject, footerArticles },
}: CoursesPageProps) => {
  const t = translationObject["en"]

  return (
    <SiteMeta
      siteName={site.siteName}
      siteLang={site.langs.en.html}
      gaPage={site.routes.courses.gaPage}
      url={site.routes.courses.to}
      robots="index,follow"
      title={`${site.siteName} courses: Quick and concise lessons about programming.`}
      type="website"
      image="/icon-192x192.png"
      description="Browse through the list of our courses and in which you will learn and understand any issues."
    >
      <Layout articles={footerArticles} t={t} routes={site.routes}>
        <Content paddingY>
          <h1 style={{ visibility: "hidden", height: 0, margin: "0" }}>
            List of courses
          </h1>
          <Grid>
            {courses.map(course => (
              <CourseTile key={course.name} data={course} />
            ))}
          </Grid>
        </Content>
      </Layout>
    </SiteMeta>
  )
}

export type { CoursesPageProps }

export default CoursesPage
