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

export const query = graphql`
  {
    authors: allFile(filter: { absolutePath: { regex: "/avatars/" } }) {
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
    thumbnails: allFile(filter: { name: { regex: "/thumbnail/" } }) {
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
    articles: allMdx(limit: 50) {
      nodes {
        frontmatter {
          cdate
          mdate
          authorId
          description
          readTime
          tags
          title
          stack
        }
        slug
      }
    }
  }
`

export default function ({ data }: HomeProps) {
  return (
    <SiteMeta
      gaPage=""
      url=""
      robots="index,follow"
      title="GreenOn Software"
      type="website"
      image="/icon-192x192.png"
      description="If you are interested in learning about programming in a concise and clean form - this is the perfect place for you."
    >
      <Layout
        navigation={<HomeNavigation />}
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
