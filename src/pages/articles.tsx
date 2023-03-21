import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout/Layout"
import Grid from "../components/article/Grid"
import { SiteMeta } from "../utils/SiteMeta"
import { getArticles, GetArticlesResponse } from "../api/getArticles"

export const query = graphql`
  {
    technologiesAvatars: allFile(filter: {relativePath: {regex: "/technologies/"}}) {
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
    thumbnails: allFile(filter: {name: {regex: "/thumbnail/"}}) {
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
    authorsAvatars: allFile(filter: {relativePath: {regex: "/avatars/"}}) {
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
  }
`

export default function (props: GetArticlesResponse) {
  return (
    <SiteMeta
      gaPage="articles"
      url="articles/"
      robots="index,follow"
      title="GreenOn Software articles"
      type="website"
      image="/icon-192x192.png"
      description="A blog created to share programming knowledge in a easy way."
    >
      <Layout>
        <Grid articles={getArticles(props)} />
      </Layout>
    </SiteMeta>
  )
}
