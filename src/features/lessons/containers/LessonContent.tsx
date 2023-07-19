import { MDXRenderer } from "gatsby-plugin-mdx"
import React from "react"
import styled from "styled-components"
import { L_DOWN, SM_DOWN } from "../../../utils/viewport"
import { CourseChapters } from "../../courses/components/course-chapters/CourseChapters"
import Button from "../../../components/button/Button"
import { Link as GatsbyLink } from "gatsby"
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
import { Content, Snippet, useModal } from "../../../ui"
import { Breadcrumbs } from "../../../components/breadcrumbs/Breadcrumbs"
import { useCustomGAEvent } from "../../../utils/useCustomGAEvent"
import { MdxProvider } from "../../../v2/providers/MdxProvider"

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

const BottomNavigation = styled.div`
  display: flex;
  justify-content: right;

  & > *:not(:first-child) {
    margin: 0 0 0 20px;
  }

  .lesson-source-button {
    @media ${L_DOWN} {
      display: none;
    }
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

  @media ${L_DOWN} {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;

    ${CourseChaptersWrapper} {
      display: none;
    }
  }
`

const ArticleSourceModal = Loadable({
  loader: () =>
    import("../../../components/article/ArticleSource").then(
      m => m.ArticleSource
    ),
  loading: () => null,
})

interface LessonContentProps {
  course: Course
  lesson: Lesson
  chapter: Chapter
  articles: Article[]
  t: Translated
  site: SiteMetadata
}

const components = {
  Snippet
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
  const lessonSourceModal = useModal()

  const handleSourceOpen = () => {
    lessonSourceModal.open()
    track({ name: "lesson_source_clicked" })
  }

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
            <Wrapper>
              <Breadcrumbs
                items={[
                  { label: "Home", path: "/" },
                  { label: "Courses", path: "/courses/" },
                  { label: course.name, path: course.path },
                  { label: lesson.name, path: lesson.path },
                ]}
              />
              <MdxProvider components={components}>
                {lesson.body}
              </MdxProvider>
              <BottomNavigation>
                <Button
                  className="lesson-source-button"
                  onClick={handleSourceOpen}
                >
                  {t.showSource}
                </Button>
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
              </BottomNavigation>
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
      {lessonSourceModal.isOpen &&
        <ArticleSourceModal
          source={lesson.rawBody}
          onClose={lessonSourceModal.close}
        />
      }
    </>
  )
}

export { LessonContent }
