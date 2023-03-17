import React from "react"

import { SiteMeta } from "../utils/SiteMeta"
import { graphql } from "gatsby"
import { HomeNavigation } from "../components/home/HomeNavigation"
import { WelcomeSection } from "../components/home/WelcomeSection"
import { StatsSection } from "../components/home/StatsSection"
import { ArticlesTimelineSection } from "../components/home/ArticlesTimelineSection"
import { HomeProps } from "../components/home/models"
import { Layout } from "../components/home/Layout"
import MobileNavigation from "../components/navigation/MobileNavigation"
import { Footer } from "../ui"
import { getArticles } from "../api/getArticles"

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
    thumbnails: allFile(filter: { name: { regex: "/thumbnail/" } }) {
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
  }
`

export default function ({ data }: HomeProps) {
  const articles = getArticles({ data })
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
      <Layout
        navigation={<HomeNavigation />}
        footer={<Footer articles={articles} />}
        main={
          <>
            <WelcomeSection />
            <StatsSection data={data} />
            <ArticlesTimelineSection data={data} />
            <MobileNavigation greenVariant />
          </>
        }
      />
    </SiteMeta>
  )
}
