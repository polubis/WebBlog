import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout/Layout"
import { SiteMeta } from "../utils/SiteMeta"
import styled from "styled-components"
import { CourseTile } from "../features/courses/components"
import { AllDataPageProps, getAllData } from "../api"
import { Content } from "../ui"

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

const Grid = styled.div`
  display: flex;
  gap: 32px;
  flex-flow: wrap;
  justify-content: center;

  & > * {
    width: 100%;
    max-width: 420px;
  }
`

export default function (props: AllDataPageProps) {
  const { courses, articles } = getAllData(props)

  return (
    <SiteMeta
      gaPage="courses"
      url="courses/"
      robots="index,follow"
      title="Courses"
      type="website"
      image="/icon-192x192.png"
      description="Browse through the list of courses and choose something for yourself."
    >
      <Layout articles={articles}>
        <Content paddingY>
          <Grid>
            {courses.map(course => (
              <CourseTile key={course.name} data={course} />
            ))}
          </Grid>
        </Content>
      </Layout>
    </SiteMeta>
  )
}
