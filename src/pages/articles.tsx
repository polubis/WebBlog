import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout/Layout"
import { Article, ArticleAuthorAvatar } from "../models/Article"
import Grid from "../components/article/Grid"
import authors from "../data/authors.json"

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
          date
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

  const articles = allMdx.nodes.map(
    (allMdxNode): Article => {
      const childImageSharp = allFile.nodes.find(
        allFileNode => allFileNode.name === allMdxNode.frontmatter.authorId
      )

      return {
        ...allMdxNode,
        author: {
          ...authors[allMdxNode.frontmatter.authorId],
          id: allMdxNode.frontmatter.authorId,
          avatar: childImageSharp.childImageSharp.fluid,
        },
      }
    }
  )

  console.log(articles)

  return (
    <Layout>
      <Grid articles={articles} />
    </Layout>
  )
}
