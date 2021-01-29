import React from "react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { defineCustomElements as deckDeckGoHighlightElement } from "@deckdeckgo/highlight-code/dist/loader"
import styled from "styled-components"

import Layout from "../layout/Layout"
import { ArticleFrontmatter } from "../../models/Article"
import { createArticle } from "../../factories/Article"
import Thumbnail from "../article/Thumbnail"
import Tags from "../article/Tags"
import { M } from "../article/Text"
import Details from "../article/Details"
import AuthorBadge from "../article/AuthorBadge"
import ReadTimeBadge from "../article/ReadTimeBadge"
import StarsBadge from "../article/StarsBadge"
import Divider from "../article/Divider"
import Intro from "./Intro"
import { L_UP } from "../../utils/viewport"

deckDeckGoHighlightElement()

const Article = styled.main`
  display: flex;
  flex-flow: column;
  margin: 0 auto;
  padding: 48px 0;

  @media ${L_UP} {
    width: 920px;
  }

  & > :nth-child(2) {
    margin: 62px 0 28px 0;
  }

  ${Divider} {
    margin: 82px 0;
  }

  ${Details} {
    & > :nth-child(2) {
      margin: 0 28px 0 54px;
    }
  }
`

interface Props {
  pageContext: {
    body: string
    slug: string
    frontmatter: ArticleFrontmatter
  }
}

export default function ({ pageContext }: Props): React.ReactElement {
  const { body, frontmatter, slug } = pageContext

  const article = createArticle({ slug, frontmatter })

  return (
    <Layout>
      <Article>
        <Thumbnail src={article.thumbnail} title={article.title} />
        <Tags tags={article.tags} />
        <Intro>
          <M>{article.description}</M>
        </Intro>
        <Details>
          <AuthorBadge
            role={article.authorRole}
            name={article.author}
            avatar="https://mercomp.pl/wp-content/uploads/2018/05/user-avatar-1.png"
          />
          <ReadTimeBadge minutes={30} />
          <StarsBadge quantity={1230} />
        </Details>
        <Divider />
        <MDXRenderer>{body}</MDXRenderer>
      </Article>
    </Layout>
  )
}
