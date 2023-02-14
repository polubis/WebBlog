import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout/Layout"
import { SiteMeta } from "../utils/SiteMeta"
import { GetCoursesResponse, serializeToCourses } from "../api"
import styled from "styled-components"
import { CourseTile } from "../features/courses/components"

export const query = graphql`
  {
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
    techAvatars: allFile(
      filter: { relativeDirectory: { regex: "/technologies/" } }
    ) {
      nodes {
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
    chapters: allMdx(filter: { slug: { regex: "/chapter/" } }) {
      nodes {
        slug
        frontmatter {
          name
        }
      }
    }
    lessons: allMdx(filter: { slug: { regex: "/lessons/" } }) {
      nodes {
        slug
        frontmatter {
          name
          duration
        }
      }
    }
    avatars: allFile(filter: { absolutePath: { regex: "/avatars/" } }) {
      nodes {
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
`

const Grid = styled.div`
  display: flex;
  gap: 32px;
  flex-flow: wrap;
  justify-content: center;
  padding: 100px 0;

  & > * {
    width: 100%;
    max-width: 420px;
  }
`

export default function (props: GetCoursesResponse): React.ReactElement {
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
      <Layout>
        <Grid>
          {serializeToCourses(props).map(course => (
            <CourseTile key={course.name} data={course} />
          ))}
        </Grid>
      </Layout>
    </SiteMeta>
  )
}
