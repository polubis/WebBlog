import { MDXRenderer } from "gatsby-plugin-mdx"
import React from "react"
import styled from "styled-components"
import theme from "../../../utils/theme"
import { L_DOWN, SM_DOWN } from "../../../utils/viewport"
import { CourseChapters } from "../../courses/components/course-chapters/CourseChapters"
import Button from "../../../components/button/Button"
import { Link as GatsbyLink } from "gatsby"
import Loadable from "react-loadable"
import Layout from "../../../components/layout/Layout"
import { Article, Chapter, Course, Lesson } from "../../../models"
import { Content } from "../../../ui"

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
    position: sticky;
    top: 0;
    right: 0;
    padding-top: 128px;
    background: ${theme.bg};
  }
`

const Dates = styled.div`
  display: flex;
  flex-flow: wrap;
`

const Wrapper = styled.div`
  ${Dates} {
    margin: 32px 0 40px 0;

    & > * {
      margin: 0 10px 10px 0;

      @media ${SM_DOWN} {
        width: 100%;
        margin: 0 0 10px 0;
        text-align: center;
      }
    }
  }
`

const CourseNavigation = styled.div`
  display: flex;
  align-items: center;
  justify-content: right;

  & > *:first-child {
    margin-right: 20px;
  }
`

const Container = styled.main`
  display: grid;
  grid-template-columns: 920px 1fr;
  gap: 40px;

  .ui-snippet {
    max-width: 920px;

    @media ${L_DOWN} {
      max-width: calc(100vw - 48px);
    }
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
}

const LessonContent = ({
  course,
  lesson,
  chapter,
  articles,
}: LessonContentProps) => {
  return (
    <>
      <MobileCourseChapters
        chapters={course.chapters}
        lessonId={lesson.id}
        chapterId={chapter.id}
      />
      <Layout articles={articles}>
        <Content paddingY>
          <Container>
            <Wrapper>
              <MDXRenderer>{lesson.body}</MDXRenderer>
              <CourseNavigation>
                {lesson.prevLesson && (
                  <GatsbyLink to={lesson.prevLesson.path}>
                    <Button>PREVIOUS</Button>
                  </GatsbyLink>
                )}
                {lesson.nextLesson && (
                  <GatsbyLink to={lesson.nextLesson.path}>
                    <Button>NEXT</Button>
                  </GatsbyLink>
                )}
              </CourseNavigation>
            </Wrapper>
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
