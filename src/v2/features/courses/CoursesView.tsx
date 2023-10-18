import React from "react"
import { useScrollToTop } from "../../../utils/useScrollToTop"
import Layout from "../../containers/Layout"
import { Content } from "../../../ui"
import styled from "styled-components"
import { useCoursesPageProvider } from "./CoursesPageProvider"
import { CourseTile } from "./components/CourseTile"
import { Link } from "gatsby"
import Button from "../../../components/button/Button"

const Grid = styled.div`
  max-width: 920px;
  margin: 0 auto;

  & > *:not(:last-child) {
    margin-bottom: 32px;
  }
`

const CoursesView = () => {
  useScrollToTop()

  const { t, courses } = useCoursesPageProvider()
  const checkCourseText = t.check_course

  return (
    <Layout>
      <h1 style={{ visibility: "hidden", height: 0, margin: "0" }}>
        {t.page_title}
      </h1>
      <Content paddingY>
        <Grid className="col">
          {courses.map(course => (
            <CourseTile
              key={course.title}
              readTime={course.duration}
              title={course.title}
              status={course.status}
              description={course.description}
              action={
                <Link to={course.path} title={course.title}>
                  <Button>{checkCourseText}</Button>
                </Link>
              }
            />
          ))}
        </Grid>
      </Content>
    </Layout>
  )
}

export { CoursesView }
