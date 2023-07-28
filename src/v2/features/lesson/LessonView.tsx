import React from "react"
import { useScrollToTop } from "../../../utils/useScrollToTop"
import Layout from "../../containers/Layout"
import { Content } from "../../../ui"

import Loadable from "react-loadable"
import { useLessonPageProvider } from "./LessonPageProvider"
import { useLayoutProvider } from "../../providers/LayoutProvider"
import styled from "styled-components"
import { L_DOWN, SM_DOWN } from "../../../utils/viewport"
import { Breadcrumbs } from "../../components/Breadcrumbs"
import { Link } from "gatsby"
import { MdxProvider } from "../../providers/MdxProvider"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { useCustomGAEvent } from "../../../utils/useCustomGAEvent"
import { CourseChapters } from "../../components/CourseChapters"

const MobileNavigation = Loadable({
  loader: () =>
    import("../../ui/MobileNavigation").then(m => m.MobileNavigation),
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

const BottomNavigation = styled.div`
  display: flex;
  justify-content: right;

  & > *:not(:first-child) {
    margin: 0 0 0 20px;
  }

  @media ${SM_DOWN} {
    flex-flow: column;

    & > *:not(:first-child) {
      margin: 20px 0 0 0;
    }

    button {
      width: 100%;
    }
  }
`

const Container = styled.main`
  display: grid;
  grid-template-columns: 920px 1fr;
  gap: 32px;

  .breadcrumbs {
    margin-bottom: 28px;
  }

  @media ${L_DOWN} {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;

    ${CourseChaptersWrapper} {
      display: none;
    }
  }
`

const LessonView = () => {
  useScrollToTop()

  const { track } = useCustomGAEvent()
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
    <Layout>
      <Content paddingY>
        <h1 style={{ visibility: "hidden", height: 0, margin: "0" }}>
          {lesson.title}
        </h1>
        <MobileNavigation>{Chapters}</MobileNavigation>
        <Container>
          <div>
            <Breadcrumbs>
              <Link to={layout.routes.home.to}>{layout.t.home}</Link>
              <Link to={layout.routes.courses.to}>{layout.t.courses}</Link>
              <Link to={lesson.course.path}>{lesson.course.title}</Link>
              <span>{lesson.title}</span>
            </Breadcrumbs>
            <MdxProvider renderer={MDXRenderer}>{lesson.body}</MdxProvider>
            <BottomNavigation>
              <a
                className="button primary upper"
                href={lesson.source_url}
                target="_blank"
                onClick={() => track({ name: "lesson_source_clicked" })}
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
            </BottomNavigation>
          </div>
          <CourseChaptersWrapper>{Chapters}</CourseChaptersWrapper>
        </Container>
      </Content>
    </Layout>
  )
}

export { LessonView }
