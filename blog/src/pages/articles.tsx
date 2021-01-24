import React from "react"
import styled from "styled-components"

import Layout from "../components/layout/Layout"
import Tile from "../components/article/Tile"
import theme from "../utils/theme"
import { graphql } from "gatsby"
import { ArticleFrontmatter } from "../models/Article"
import { createArticle } from "../factories/Article"

const ArticlesPage = styled.div`
  display: grid;
  grid-template-columns: 442px 442px 442px;
  grid-template-rows: auto;
  grid-gap: 72px;
  justify-content: center;
  padding: 100px 82px;
  box-sizing: border-box;

  & > div {
    &::after,
    &::before {
      position: absolute;
      height: 128px;
      width: 1px;
      background: ${theme.primary};
    }

    &::after {
      top: 0;
      right: 0;
    }

    &::before {
      bottom: 0;
      left: 0;
    }

    &:nth-of-type(3n) {
      &::before {
        content: "";
      }
    }

    &:first-of-type,
    &:nth-of-type(3n + 4) {
      &::after {
        content: "";
      }
    }

    &:nth-of-type(3n + 2) {
      &::after,
      &::before {
        content: "";
      }
    }
  }
`

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
      <ArticlesPage>
        {articles.map(article => (
          <Tile key={article.slug} article={article} />
        ))}
      </ArticlesPage>
    </Layout>
  )
}
