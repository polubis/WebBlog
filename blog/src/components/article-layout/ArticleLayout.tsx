import React from "react"
import { graphql } from "gatsby"

import { MDXRenderer } from "gatsby-plugin-mdx"

import Layout from "../layout/Layout"
import { ArticleFrontmatter } from "../../models/Article"
import { createArticle } from "../../factories/Article"
import styled, { css } from "styled-components"
import ArticleIntroPage from "./ArticleIntroPage"
import ArticleTags from "../article-tags/ArticleTags"
import ArticleTitle from "../article-title/ArticleTitle"

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
        thumbnail
        readTime
        tags
      }
      slug
      body
    }
  }
`

const ArticleLayoutContainer = styled.main`
  padding: 48px 0 0 0;
  display: flex;
  flex-flow: column;
  margin: 0 auto;
  width: 920px;

  & > :nth-child(2) {
    margin: 68px 0 28px 0;
  }
`

export default function ({ data }: Props): React.ReactElement {
  const {
    mdx: { body, frontmatter, slug },
  } = data

  const article = createArticle({ slug, frontmatter })

  return (
    <Layout>
      <ArticleLayoutContainer>
        <ArticleIntroPage article={article} />
        <ArticleTags tags={article.tags} />
        <MDXRenderer>{body}</MDXRenderer>
      </ArticleLayoutContainer>
    </Layout>
  )
}
