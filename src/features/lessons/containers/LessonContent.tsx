import { MDXRenderer } from "gatsby-plugin-mdx"
import React from "react"
import styled from "styled-components"
import { L_DOWN, SM_DOWN } from "../../../utils/viewport"
import { CourseChapters } from "../../courses/components/course-chapters/CourseChapters"
import Button from "../../../components/button/Button"
import { Link } from "gatsby"
import Loadable from "react-loadable"
import Layout from "../../../components/layout/Layout"
import {
  Article,
  Chapter,
  Course,
  Lesson,
  SiteMetadata,
  Translated,
} from "../../../models"
import { A, Content } from "../../../ui"
import { useCustomGAEvent } from "../../../utils/useCustomGAEvent"
import { Breadcrumbs } from "../../../v2/components/Breadcrumbs"

const MobileCourseChapters = Loadable({
  loader: () =>
    import("../../courses/components/mobile-course-chapters").then(
      m => m.MobileCourseChapters
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

interface LessonContentProps {
  course: Course
  lesson: Lesson
  chapter: Chapter
  articles: Article[]
  t: Translated
  site: SiteMetadata
}

const LessonContent = ({
  course,
  lesson,
  chapter,
  articles,
  t,
  site,
}: LessonContentProps) => {
  const { track } = useCustomGAEvent()

  return (
    <>
      <h1 style={{ visibility: "hidden", height: 0, margin: "0" }}>
        {lesson.name}
      </h1>
      <MobileCourseChapters
        chapters={course.chapters}
        lessonId={lesson.id}
        chapterId={chapter.id}
      />
      <Layout articles={articles} t={t} routes={site.routes}>
        <Content paddingY>
          <Container>
            <div>
              <Breadcrumbs>
                <Link to="/">Home</Link>
                <Link to="/courses/">Courses</Link>
                <Link to={course.path}>{course.name}</Link>
                <span>{lesson.name}</span>
              </Breadcrumbs>
              <MDXRenderer>{lesson.body}</MDXRenderer>
              <BottomNavigation>
                <A
                  href={`https://github.com/polubis/WebBlog/tree/main/src/courses/${lesson.slug}.mdx`}
                  outside
                >
                  <Button
                    onClick={() => track({ name: "lesson_source_clicked" })}
                  >
                    {t.showSource}
                  </Button>
                </A>
                {lesson.prevLesson && (
                  <Link to={lesson.prevLesson.path}>
                    <Button>PREVIOUS</Button>
                  </Link>
                )}
                {lesson.nextLesson && (
                  <Link to={lesson.nextLesson.path}>
                    <Button>NEXT</Button>
                  </Link>
                )}
              </BottomNavigation>
            </div>
            <CourseChaptersWrapper>
              <CourseChapters
                activeChapterId={chapter.id}
                activeLessonId={lesson.id}
                chapters={course.chapters}
              />
            </CourseChaptersWrapper>
          </Container>
        </Content>
      </Layout>
    </>
  )
}

export { LessonContent }
