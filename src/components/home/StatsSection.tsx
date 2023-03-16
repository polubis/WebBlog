import React from "react"
import styled from "styled-components"
import { CodeEditorTile, M, XXL } from "../../ui"
import AuthorAvatar from "../article/AuthorAvatar"
import Button from "../button/Button"
import authors from "../../authors/authors.json"
import { Author, AuthorWithAvatar, HomeProps } from "./models"
import { Link } from "gatsby"
import { Shape } from "./Shape"
import { L_DOWN, T_DOWN, M_DOWN, M_UP } from "../../utils/viewport"

const Wrapper = styled.div`
  position: relative;
  overflow: hidden;

  & > svg {
    right: -250px;
    bottom: 0;
    transform: rotate(90deg);
    position: absolute;

    @media ${L_DOWN} {
      transform: scale(3);
    }
  }
`

const Container = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto;
  gap: 32px;
  width: 668px;
  margin: 0 auto;
  padding: 162px 24px;

  @media ${M_DOWN} {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto;
  }

  @media ${T_DOWN} {
    width: 100%;
    padding: 32px 24px;
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

export const StatsSection = ({ data }: HomeProps) => {
  const authorsWithAvatars = (authors as Author[]).map(
    (author): AuthorWithAvatar => {
      const foundNode = data.authors.edges.find(
        ({ node }) => node.name === author.id
      )

      if (!foundNode) {
        throw new Error("Lack of avatar for given user")
      }

      return {
        ...author,
        avatar: foundNode.node.childImageSharp.fluid,
      }
    }
  )

  const articlesCount = data.articles.nodes.length
  const authorsCount = data.authors.edges.length
  const coursesCount = data.courses.nodes.length
  const lessonsCount = data.lessons.nodes.length

  return (
    <Wrapper>
      <Shape />

      <Container>
        <CodeEditorTile>
          <XXL>
            {articlesCount} {articlesCount <= 1 ? "article" : "articles"}
          </XXL>
        </CodeEditorTile>

        <CodeEditorTile>
          <XXL>
            {authorsCount} {authorsCount <= 1 ? "author" : "authors"}
          </XXL>
        </CodeEditorTile>

        <CodeEditorTile>
          <XXL>
            {coursesCount} {coursesCount <= 1 ? "course" : "courses"}
          </XXL>
        </CodeEditorTile>

        <CodeEditorTile>
          <XXL>
            {lessonsCount} {lessonsCount <= 1 ? "lesson" : "lessons"}
          </XXL>
        </CodeEditorTile>

        <CodeEditorTile>
          <BloggerTileContent>
            <XXL>Become a blogger</XXL>
            <M>
              Use our creator and add your first article. You will get the
              necessary technical assistance.
            </M>
            <Link to="/blog-creator/">
              <Button>WRITE YOUR FIRST ARTICLE</Button>
            </Link>
          </BloggerTileContent>
          <AvatarWrapper>
            <AuthorAvatar size="big" avatar={authorsWithAvatars[0].avatar} />
          </AvatarWrapper>
        </CodeEditorTile>
      </Container>
    </Wrapper>
  )
}
