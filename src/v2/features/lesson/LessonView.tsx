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
import { NavigationSection } from "../../components/NavigationSection"
import Thumbnail from "../../../components/article/Thumbnail"
import { ShareButton } from "../../containers/ShareButton"
import { useAnalytics } from "../../../utils/useAnalytics"

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

  const { track } = useAnalytics()
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
              <NavigationSection>
                <ShareButton
                  url={lesson.source_url}
                  link={lesson.url}
                  title={lesson.title}
                  description={lesson.description}
                  time={lesson.duration}
                  level={lesson.course.seniority}
                  tags={lesson.course.tags}
                  stack={lesson.course.technologies.map(({ id }) => id)}
                />
                <a
                  className="button primary upper"
                  href={lesson.source_url}
                  target="_blank"
                  onClick={() => track({ name: 'source_clicked' })}
                >
                  {layout.t.show_source}
                </a>
                {lesson.prev && (
                  <Link className="button primary upper" to={lesson.prev.path}>
                    {layout.t.prev}
                  </Link>
                )}
                {lesson.next && (
                  <Link className="button primary upper" to={lesson.next.path}>
                    {layout.t.next}
                  </Link>
                )}
              </NavigationSection>
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
