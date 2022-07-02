import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout/Layout"
import { ArticleAuthorAvatar } from "../models/Article"
import authors from "../authors/authors.json"
import styled from "styled-components"
import AuthorAvatar from "../components/article/AuthorAvatar"
import { XL, M, GithubIcon, LinkedinIcon, X } from "../ui"
import theme from "../utils/theme"
import { SiteMeta } from "../utils/SiteMeta"

interface Author {
  id: string
  name: string
  firstName: string
  lastName: string
  role: string
  bio: string
  githubURL?: string
  linkedinURL?: string
}

interface AuthorWithAvatar extends Author {
  avatar: ArticleAuthorAvatar
}

interface Props {
  data: {
    allFile: {
      edges: {
        node: {
          name: string
          childImageSharp: {
            fluid: ArticleAuthorAvatar
          }
        }
      }[]
    }
  }
}

const Grid = styled.div`
  display: grid;
  justify-content: center;
  width: 100%;
  grid-template-columns: repeat(auto-fill, minmax(310px, 400px));
  grid-gap: 28px;
  padding: 100px 0;
`

const Tile = styled.div`
  position: relative;
  display: flex;
  flex-flow: column;
  align-items: center;
  padding: 26px 22px;
  border-radius: 2px;
  border: 1px solid ${theme.primary};

  & > *:nth-child(2) {
    margin: 24px 0 12px 0;
  }

  & > *:nth-child(4) {
    text-align: justify;
    display: block;
    margin: 18px 0 0 0;
  }
`

const Media = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: auto;
  padding: 32px 0 16px 0;

  & > *:not(:first-child) {
    margin-left: 24px;
  }

  a {
    cursor: pointer;

    &:hover {
      color: ${theme.primary};
    }
  }
`

export const query = graphql`
  {
    allFile(filter: { absolutePath: { regex: "/avatars/" } }) {
      edges {
        node {
          name
          childImageSharp {
            fluid {
              base64
              aspectRatio
              src
              srcSet
              sizes
            }
          }
        }
      }
    }
  }
`

export default function ({ data }: Props): React.ReactElement {
  const authorsWithAvatars = (authors as Author[]).map(
    (author): AuthorWithAvatar => {
      const foundNode = data.allFile.edges.find(
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

  return (
    <SiteMeta
      url="/authors/"
      robots="index,follow"
      title="GreenOn Software blog authors"
      type="website"
      description="Contact the blog authors and start writing."
    >
      <Layout>
        <Grid>
          {authorsWithAvatars.map(author => (
            <Tile key={author.id}>
              <AuthorAvatar size="medium" avatar={author.avatar} />
              <XL>
                {author.firstName} {author.lastName}
              </XL>
              <X>{author.role}</X>
              <M>{author.bio}</M>
              <Media>
                {author.githubURL && (
                  <a
                    href={author.githubURL}
                    title="Github profile"
                    target="_blank"
                  >
                    <GithubIcon />
                  </a>
                )}
                {author.linkedinURL && (
                  <a
                    href={author.linkedinURL}
                    title="Linkedin profile"
                    target="_blank"
                  >
                    <LinkedinIcon />
                  </a>
                )}
              </Media>
            </Tile>
          ))}
        </Grid>
      </Layout>
    </SiteMeta>
  )
}
