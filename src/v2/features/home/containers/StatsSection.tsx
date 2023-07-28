import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import { useLayoutProvider } from "../../../providers/LayoutProvider"
import { useHomePageProvider } from "../HomePageProvider"
import theme from "../../../../utils/theme"
import { M_DOWN, M_UP, T_DOWN } from "../../../../utils/viewport"
import { CodeEditorTile, M, XXL } from "../../../../ui"
import AuthorAvatar from "../../../../components/article/AuthorAvatar"

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
    outline: 2px solid transparent;
    border-radius: 4px;

    &:hover {
      outline-color: ${theme.primary};
      outline-offset: 4px;
    }
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

const StatsSection = () => {
  const layout = useLayoutProvider()
  const home = useHomePageProvider()

  return (
    <Container>
      <Link to={layout.routes.articles.to}>
        <CodeEditorTile>
          <XXL>
            {home.articles_count} {layout.t.articles}
          </XXL>
        </CodeEditorTile>
      </Link>

      <Link to={layout.routes.authors.to}>
        <CodeEditorTile>
          <XXL>
            {home.authors_count} {layout.t.authors}
          </XXL>
        </CodeEditorTile>
      </Link>

      <Link to={layout.routes.courses.to}>
        <CodeEditorTile>
          <XXL>
            {home.courses_count} {layout.t.courses}
          </XXL>
        </CodeEditorTile>
      </Link>

      <a
        href={layout.discord_url}
        title={layout.t.discord_channel}
        target="_blank"
        rel="noopener noreferrer"
      >
        <CodeEditorTile>
          <XXL>
            {home.students_count} {home.t.students}
          </XXL>
        </CodeEditorTile>
      </a>

      <a
        href={layout.repo_url}
        title={layout.t.contributors}
        target="_blank"
        rel="noopener noreferrer"
      >
        <CodeEditorTile>
          <XXL>
            {home.devs_count} {home.t.devs}
          </XXL>
        </CodeEditorTile>
      </a>

      <Link to={layout.routes.courses.to}>
        <CodeEditorTile>
          <XXL>
            {home.lessons_count} {home.t.lessons}
          </XXL>
        </CodeEditorTile>
      </Link>

      <Link to={layout.routes.courses.to}>
        <CodeEditorTile>
          <XXL>
            {home.topics_count} {home.t.chapters}
          </XXL>
        </CodeEditorTile>
      </Link>

      <Link to={layout.routes.articles.to}>
        <CodeEditorTile>
          <XXL>
            {home.technologies_count} {home.t.topics}
          </XXL>
        </CodeEditorTile>
      </Link>

      <CodeEditorTile>
        <BloggerTileContent className="col">
          <XXL>{home.t.become_a_heading}</XXL>
          <M>{home.t.become_a_description}</M>
          <Link className="button primary upper" to={layout.routes.creator.to}>
            {home.t.become_a_action}
          </Link>
        </BloggerTileContent>
        <AvatarWrapper>
          <AuthorAvatar avatar={home.random_user_avatar} />
        </AvatarWrapper>
      </CodeEditorTile>
    </Container>
  )
}

export { StatsSection }
