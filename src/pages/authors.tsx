import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout/Layout"
import styled from "styled-components"
import AuthorAvatar from "../components/article/AuthorAvatar"
import { XL, M, GithubIcon, LinkedinIcon, X, Content } from "../ui"
import theme from "../utils/theme"
import { SiteMeta } from "../utils/SiteMeta"
import { EmptyAuthorTile } from "../components/empty-author-tile/EmptyAuthorTile"
import {
  useJoinUsModal,
  WithJoinUsModal,
} from "../components/article/WithJoinUsModal"
import { AllDataPageProps, getAllData } from "../api/getAllData"

const Grid = styled.div`
  display: grid;
  justify-content: center;
  width: 100%;
  grid-template-columns: repeat(auto-fill, minmax(200px, 400px));
  grid-gap: 20px;
`

const Tile = styled.div`
  position: relative;
  display: flex;
  flex-flow: column;
  align-items: center;
  padding: 26px 22px;
  border-radius: 4px;
  border: 1px solid ${theme.primary};

  ${XL}, ${X} {
    text-align: center;
  }

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
    technologiesAvatars: allFile(
      filter: { relativePath: { regex: "/technologies/" } }
    ) {
      nodes {
        name
        relativePath
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
    articleThumbnails: allFile(filter: { name: { regex: "/thumbnail/" } }) {
      nodes {
        name
        relativePath
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
    authorsAvatars: allFile(filter: { relativePath: { regex: "/avatars/" } }) {
      nodes {
        name
        relativePath
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
    articles: allMdx(filter: { fileAbsolutePath: { regex: "/index.mdx/" } }) {
      nodes {
        frontmatter {
          cdate
          mdate
          tbcdate
          authorId
          treviewerId
          lreviewerId
          tags
          description
          readTime
          graphicauthor
          stack
          title
        }
        body
        slug
      }
    }
    courses: allMdx(filter: { fileAbsolutePath: { regex: "/course.mdx/" } }) {
      nodes {
        slug
        fileAbsolutePath
        frontmatter {
          authorId
          treviewerId
          lreviewerId
          stack
          tags
          description
          name
          status
          cdate
          mdate
        }
      }
    }
    lessons: allMdx(filter: { slug: { regex: "/lessons/" } }) {
      nodes {
        slug
        body
        frontmatter {
          name
          duration
          description
        }
      }
    }
    chapters: allMdx(filter: { slug: { regex: "/chapter/" } }) {
      nodes {
        slug
        frontmatter {
          name
        }
      }
    }
    coursesThumbnails: allFile(
      filter: { relativePath: { regex: "/course.jpg/" } }
    ) {
      nodes {
        relativePath
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
`

const ConnectedEmptyAuthorTile = () => {
  const ctx = useJoinUsModal()

  return <EmptyAuthorTile onClick={ctx.open} />
}

export default function (props: AllDataPageProps) {
  const { authors, articles } = getAllData(props)

  return (
    <SiteMeta
      gaPage="authors"
      url="authors/"
      robots="index,follow"
      title="GreenOn Software blog authors"
      type="website"
      image="/icon-192x192.png"
      description="Contact the blog authors and start writing."
    >
      <WithJoinUsModal>
        <Layout articles={articles}>
          <Content paddingY>
            <Grid>
              <ConnectedEmptyAuthorTile />
              {authors.map(author => (
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
          </Content>
        </Layout>
      </WithJoinUsModal>
    </SiteMeta>
  )
}
