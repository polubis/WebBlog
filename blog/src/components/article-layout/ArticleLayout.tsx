import React from "react"
import { graphql } from "gatsby"

import { MDXRenderer } from "gatsby-plugin-mdx"

import Layout from "../layout/Layout"
import { ArticleFrontmatter } from "../../models/Article"
import { createArticle } from "../../factories/Article"

interface Props {
  data: {
    mdx: {
      body: string
      slug: string
      frontmatter: ArticleFrontmatter
    }
  }
}

export const query = graphql`
  query GetSingleArticle($title: String) {
    mdx(frontmatter: { title: { eq: $title } }) {
      frontmatter {
        date
        author
        description
        image
        readTime
        tags
      }
      slug
      body
    }
  }
`

export default function ({ data }: Props): React.ReactElement {
  const {
    mdx: { body, frontmatter, slug },
  } = data

  const article = createArticle({ slug, frontmatter })

  console.log(article);

  return (
    <Layout>
      <MDXRenderer>{body}</MDXRenderer>
    </Layout>
  )
}
