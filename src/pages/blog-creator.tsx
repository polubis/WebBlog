import React from "react"
import { AllDataPageProps, getAllData } from "../api"
import BlogCreator from "../components/blog-creator/BlogCreator"
import Layout from "../components/layout/Layout"
import { SiteMeta } from "../utils/SiteMeta"
import { graphql } from "gatsby"
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

export default function (props: AllDataPageProps) {
  const { articles } = getAllData(props)

  return (
    <SiteMeta
      gaPage="blog-creator"
      url="blog-creator/"
      robots="index,follow"
      title="Blog creator"
      type="website"
      image="/icon-192x192.png"
      description="Join the community and create your first article in a fast and fun way."
    >
      <Layout articles={articles}>
        <Content paddingY>
          <BlogCreator />
        </Content>
      </Layout>
    </SiteMeta>
  )
}
