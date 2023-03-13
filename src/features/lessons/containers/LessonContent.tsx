import { MDXRenderer } from "gatsby-plugin-mdx"
import React from "react"
import styled from "styled-components"
import MobileNavigation from "../../../components/navigation/MobileNavigation"
import Navbar from "../../../components/navigation/Navbar"
import theme from "../../../utils/theme"
import { L_DOWN, SM_DOWN } from "../../../utils/viewport"
import { CourseChapters } from "../../courses/components/course-chapters/CourseChapters"
import { useLessonProvider } from "../LessonProvider"
import { defineCustomElements as deckDeckGoHighlightElement } from "@deckdeckgo/highlight-code/dist/loader"
import Button from "../../../components/button/Button"
import { Link as GatsbyLink } from "gatsby"
import { Snippet } from "../../../ui"

deckDeckGoHighlightElement()

const CourseChaptersWrapper = styled.div`
  position: relative;

  & > * {
    position: sticky;
    top: 0;
    right: 0;
    padding-top: 20px;
    background: ${theme.bg};
  }
`

const Layout = styled.main`
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 40px 62px;
  padding: 80px 24px 120px 24px;
  margin: 0 auto;
  max-width: 1280px;

  @media ${L_DOWN} {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;

    ${CourseChaptersWrapper} {
      grid-row: 1/2;
      max-width: 400px;
    }
  }
`

const Dates = styled.div`
  display: flex;
  flex-flow: wrap;
`

const Content = styled.div`
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

export const LessonContent = () => {
  const { course, chapter, lesson } = useLessonProvider()

  return (
    <>
      <Navbar />
      <MobileNavigation />
      <Layout>
        <Content>
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
        </Content>
        <CourseChaptersWrapper>
          <CourseChapters
            activeChapterId={chapter.id}
            activeLessonId={lesson.id}
            chapters={course.chapters}
          />
        </CourseChaptersWrapper>
      </Layout>
    </>
  )
}
