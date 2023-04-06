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
  pageContext: { courses, articles },
}: CoursesPageProps) => {
  return (
    <SiteMeta
      gaPage="courses"
      url="courses/"
      robots="index,follow"
      title="Courses"
      type="website"
      image="/icon-192x192.png"
      description="Browse through the list of courses and choose something for yourself."
    >
      <Layout articles={articles}>
        <Content paddingY>
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
