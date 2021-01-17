import React from "react"
import { graphql } from "gatsby"

import { MDXRenderer } from "gatsby-plugin-mdx"

import Layout from "../layout/Layout"
import { ArticleFrontmatter } from "../../models/Article"

interface Props {
  data: {
    mdx: {
      body: string
      frontmatter: ArticleFrontmatter
    }
  }
}

export const query = graphql`
  query GetSingleArticle($title: String) {
    mdx(frontmatter: { title: { eq: $title } }) {
      frontmatter {
        description
        image
        author
        readTime
        date(formatString: "MMMM Do, YYYY")
      }
      body
    }
  }
`

export default function ({ data }: Props): React.ReactElement {
  const {
    mdx: { body },
  } = data

  return (
    <Layout>
      <MDXRenderer>{body}</MDXRenderer>
    </Layout>
  )
}
