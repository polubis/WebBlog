import React from "react"
import { useScrollToTop } from "../../../utils/useScrollToTop"
import Layout from "../../containers/Layout"
import { Content } from "../../../ui"

import Loadable from "react-loadable"
import { useLessonPageProvider } from "./LessonPageProvider"
import { useLayoutProvider } from "../../providers/LayoutProvider"
import styled from "styled-components"
import { L_DOWN } from "../../../utils/viewport"
import { Breadcrumbs } from "../../components/Breadcrumbs"
import { Link } from "gatsby"
import { MdxProvider } from "../../providers/MdxProvider"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { CourseChapters } from "../../components/CourseChapters"
import Thumbnail from "../../../components/article/Thumbnail"
import { SummaryFooter } from "../../containers/SummaryFooter"

const MobileNavigation = Loadable({
  loader: () =>
    import("../../ui/mobile-navigation/MobileNavigation").then(
      m => m.MobileNavigation
    ),
  loading: () => null,
})

const CourseChaptersWrapper = styled.div`
  position: relative;

  & > * {
    max-height: 90vh;
    overflow-y: auto;
    position: sticky;
    top: 0;
    right: 0;
    padding: 20px 20px 0 0;
  }
`

const Container = styled.main`
  display: grid;
  grid-template-columns: 920px 1fr;
  gap: 32px;

  .thumbnail {
    margin: 12px 0 62px 0;
  }

  @media ${L_DOWN} {
    grid-template-columns: 100%;
    grid-template-rows: auto auto;

    ${CourseChaptersWrapper} {
      display: none;
    }
  }
`

const LessonView = () => {
  useScrollToTop()

  const layout = useLayoutProvider()
  const lesson = useLessonPageProvider()

  const Chapters = (
    <CourseChapters
      activeChapterId={lesson.chapter.title}
      activeLessonId={lesson.title}
      chapters={lesson.chapters}
    />
  )

  return (
    <>
      <Layout>
        <Content paddingY>
          <h1 style={{ visibility: "hidden", height: 0, margin: "0" }}>
            {lesson.title}
          </h1>
          <Container>
            <div>
              <Breadcrumbs>
                <Link to={layout.routes.home.to}>{layout.t.home}</Link>
                <Link to={layout.routes.courses.to}>{layout.t.courses}</Link>
                <Link to={lesson.course.path}>{lesson.course.title}</Link>
                <span>{lesson.title}</span>
              </Breadcrumbs>
              <Thumbnail
                seniorityTitle={layout.t[lesson.course.seniority]}
                readTime={lesson.duration}
                thumbnail={lesson.thumbnail}
                title={lesson.title}
                thumbnailAlt={lesson.title}
                newLabel={layout.t.new}
                seniorityLevel={lesson.course.seniority}
              />
              <MdxProvider renderer={MDXRenderer}>{lesson.body}</MdxProvider>
              {console.log(lesson)}
              <SummaryFooter
                path={lesson.url}
                fullName={lesson.author.full_name}
                role={lesson.author.role}
                avatar={lesson.author.avatar.small}
                url={lesson.source_url}
                title={lesson.title}
                sourceUrl={lesson.source_url}
                description={lesson.description}
                rate={lesson.rate}
                duration={lesson.duration}
                seniority={lesson.course.seniority}
                tags={lesson.course.tags}
                technologies={lesson.course.technologies}
                prevPath={lesson.prev?.path}
                nextPath={lesson.next?.path}
              />
            </div>
            <CourseChaptersWrapper>{Chapters}</CourseChaptersWrapper>
          </Container>
        </Content>
      </Layout>
      <MobileNavigation>{Chapters}</MobileNavigation>
    </>
  )
}

export { LessonView }
