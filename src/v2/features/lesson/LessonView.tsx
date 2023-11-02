import React from "react"
import Layout from "../../containers/Layout"
import { Content } from "../../../ui"
import { useLayoutProvider } from "../../providers/LayoutProvider"
import styled from "styled-components"
import { L_DOWN } from "../../../utils/viewport"
import { ArticleBody } from "../../containers/ArticleBody"
import { Link } from "gatsby"
import { useArticleProvider } from "../../providers/ArticleProvider"
import { CourseChapters } from "../../components/CourseChapters"
import Loadable from "react-loadable"

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
  const layout = useLayoutProvider()
  const { state: article } = useArticleProvider()

  const Chapters = (
    <CourseChapters
      activeChapterId={article.chapter!.title}
      activeLessonId={article.title}
      chapters={article.chapters!}
    />
  )

  return (
    <>
      <Layout>
        <Content paddingY>
          <Container>
            <ArticleBody
              breadcrumbs={
                <>
                  <Link to={layout.routes.home.to}>{layout.t.home}</Link>
                  <Link to={layout.routes.courses.to}>{layout.t.courses}</Link>
                  <Link to={article.course!.path}>{article.course!.title}</Link>
                  <span>{article.title}</span>
                </>
              }
            />
            <CourseChaptersWrapper>{Chapters}</CourseChaptersWrapper>
          </Container>
        </Content>
      </Layout>
      <MobileNavigation>{Chapters}</MobileNavigation>
    </>
  )
}

export { LessonView }
