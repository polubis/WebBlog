import React from "react"

import { SiteMeta } from "../utils/SiteMeta"
import { graphql } from "gatsby"
import { WelcomeSection } from "../components/home/WelcomeSection"
import { StatsSection } from "../components/home/StatsSection"
import { ArticlesTimelineSection } from "../components/home/ArticlesTimelineSection"
import Layout from "../components/layout/Layout"
import { getAllData, AllDataPageProps } from "../api/getAllData"
import { BlackHoleSection } from "../components/home/BlackHoleSection"

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
  const { articles, authors, courses, totalLessons, timeline } = getAllData(
    props
  )

  return (
    <SiteMeta
      gaPage=""
      url=""
      robots="index,follow"
      title="GreenOn Software"
      type="website"
      image="/icon-192x192.png"
      description="A place for people who love programming and personal development."
    >
      <Layout articles={articles}>
        <BlackHoleSection />
        <WelcomeSection />
        <StatsSection
          articlesCount={articles.length}
          authorsCount={authors.length}
          coursesCount={courses.length}
          lessonsCount={totalLessons}
          topAuthor={authors[0]}
        />
        <ArticlesTimelineSection data={timeline} />
      </Layout>
    </SiteMeta>
  )
}
