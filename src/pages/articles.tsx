import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout/Layout"
import { Article, ArticleAuthorAvatar } from "../models/Article"
import Grid from "../components/article/Grid"
import authors from "../authors/authors.json"
import { SiteMeta } from "../utils/SiteMeta"

interface Props {
  data: {
    allMdx: {
      nodes: Omit<Article, "author">[]
    }
    allFile: {
      nodes: {
        name: string
        relativePath: string
        childImageSharp: {
          fluid: ArticleAuthorAvatar
        }
      }[]
    }
  }
}

export const query = graphql`
  {
    allFile(filter: { name: { ne: "index" } }) {
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
    allMdx {
      nodes {
        frontmatter {
          cdate
          mdate
          tbcdate
          authorId
          description
          readTime
          tags
          title
        }
        slug
      }
    }
  }
`

export default function ({ data }: Props): React.ReactElement {
  const { allMdx, allFile } = data

  const articles = allMdx.nodes
    .sort((a, b) => {
      if (a.frontmatter.cdate > b.frontmatter.cdate) {
        return -1
      }

      if (a.frontmatter.cdate === b.frontmatter.cdate) {
        return 0
      }

      return 1
    })
    .map(
      (allMdxNode, idx): Article => {
        const childImageSharp = allFile.nodes.find(
          allFileNode => allFileNode.name === allMdxNode.frontmatter.authorId
        )!

        return {
          ...allMdxNode,
          isNew: idx === 0,
          author: {
            ...authors[allMdxNode.frontmatter.authorId],
            id: allMdxNode.frontmatter.authorId,
            avatar: childImageSharp.childImageSharp.fluid,
          },
        }
      }
    )

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
        <Grid articles={articles} />
      </Layout>
    </SiteMeta>
  )
}
