import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout/Layout"
import { ArticleFrontmatter } from "../models/Article"
import { createArticle } from "../factories/Article"
import Grid from "../components/article/Grid"

interface Props {
  data: {
    allMdx: {
      nodes: { frontmatter: ArticleFrontmatter; slug: string }[]
    }
  }
}

export const query = graphql`
  query GetArticles {
    allMdx {
      nodes {
        frontmatter {
          date
          author
          authorRole
          description
          readTime
          tags
          thumbnail
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

  const articles = nodes.map(node => createArticle(node))

  return (
    <Layout>
      <Grid articles={articles} />
    </Layout>
  )
}
