import React from "react"
import styled from "styled-components"
import { CodeEditorTile, M, XXL } from "../../ui"
import AuthorAvatar from "../article/AuthorAvatar"
import Button from "../button/Button"
import { Link } from "gatsby"
import { T_DOWN, M_DOWN, M_UP } from "../../utils/viewport"
import { Author } from "../../models"

const Container = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto;
  gap: 32px;
  width: 668px;
  margin: 0 auto;
  padding: 162px 20px;

  & > a {
    text-decoration: none;
  }

  @media ${M_DOWN} {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto;
  }

  @media ${T_DOWN} {
    width: 100%;
    padding: 32px 20px;
  }

  & > *:last-child {
    @media ${M_UP} {
      grid-column: 1/3;
    }
  }
`

const BloggerTileContent = styled.div`
  display: flex;
  flex-flow: column;
  padding-bottom: 12px;

  & > *:nth-child(2) {
    margin: 22px 0 48px 0;
  }

  & > *:last-child {
    margin-right: auto;
  }
`

const AvatarWrapper = styled.div`
  position: relative;
  width: max-content;
  margin: 0 38px 0 58px;

  @media ${M_DOWN} {
    display: none;
  }

  &::before,
  &::after {
    content: "";
    position: absolute;
    background: #434141;
    height: 200px;
    width: 200px;
    border-radius: 50%;
  }

  &::before {
    left: -22px;
    top: -8px;
  }

  &::after {
    right: -22px;
    bottom: -8px;
  }

  .gatsby-image-wrapper {
    z-index: 1;
  }
`

interface StatsSectionProps {
  articlesCount: number
  authorsCount: number
  coursesCount: number
  lessonsCount: number
  topAuthor: Author
}

const StatsSection = ({
  articlesCount,
  authorsCount,
  coursesCount,
  lessonsCount,
  topAuthor,
}: StatsSectionProps) => {
  return (
    <Container className="stats-section-container">
      <Link to="/articles/">
        <CodeEditorTile>
          <XXL>
            {articlesCount} {articlesCount === 1 ? "article" : "articles"}
          </XXL>
        </CodeEditorTile>
      </Link>

      <Link to="/authors/">
        <CodeEditorTile>
          <XXL>
            {authorsCount} {authorsCount === 1 ? "author" : "authors"}
          </XXL>
        </CodeEditorTile>{" "}
      </Link>

      <Link to="/courses/">
        <CodeEditorTile>
          <XXL>
            {coursesCount} {coursesCount === 1 ? "course" : "courses"}
          </XXL>
        </CodeEditorTile>{" "}
      </Link>

      <CodeEditorTile>
        <XXL>
          {lessonsCount} {lessonsCount === 1 ? "lesson" : "lessons"}
        </XXL>
      </CodeEditorTile>{" "}

      <CodeEditorTile>
        <BloggerTileContent>
          <XXL>Become a blogger</XXL>
          <M>
            Use our creator and add your first article. You will get the
            necessary technical assistance.
          </M>
          <Link to="/blog-creator/">
            <Button className="write-article-button">WRITE YOUR FIRST ARTICLE</Button>
          </Link>
        </BloggerTileContent>
        <AvatarWrapper>
          <AuthorAvatar size="big" avatar={topAuthor.avatar} />
        </AvatarWrapper>
      </CodeEditorTile>
    </Container>
  )
}

export type { StatsSectionProps }

export { StatsSection }
