import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout/Layout"
import { Article, ArticleAuthor } from "../models/Article"
import Grid from "../components/article/Grid"
import authors from "../data/authors.json"

interface Props {
  data: {
    allMdx: {
      nodes: Omit<Article, "author">[]
    }
  }
}

export const query = graphql`
  query GetArticles {
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
  const {
    allMdx: { nodes },
  } = data

  const articles = nodes.map(
    (node): Article => ({
      ...node,
      author: {
        ...authors[node.frontmatter.authorId],
        id: node.frontmatter.authorId,
      },
    })
  )

  console.log(articles)

  return (
    <Layout>
      <Grid articles={articles} />
    </Layout>
  )
}
