import React from "react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { defineCustomElements as deckDeckGoHighlightElement } from "@deckdeckgo/highlight-code/dist/loader"
import styled from "styled-components"

import Layout from "../layout/Layout"
import { Article as ArticleModel } from "../../models/Article"
import Thumbnail from "../article/Thumbnail"
import Tags from "../article/Tags"
import { M } from "../../ui"
import Details from "../article/Details"
import { AuthorBadge, ReadTimeBadge } from "../badges"
import Divider from "../article/Divider"
import Intro from "./Intro"
import { L_UP } from "../../utils/viewport"
import { Helmet } from "react-helmet"
import { useGAPage } from "../../utils/useGAPage"

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
    article: ArticleModel
  }
}

export default function ({ pageContext }: Props): React.ReactElement {
  const {
    article: { frontmatter, author, thumbnail, body },
  } = pageContext

  const { title, description, tags, readTime } = frontmatter

  useGAPage(window.location.pathname)

  const pageTitle = `${title} | by ${author.firstName} ${author.lastName} | GreenOn Software`

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta property="og:type" content="article"></meta>
        <meta name="description" content={description} />
        <meta property="og:description" content={description}></meta>
        <meta
          name="author"
          content={author.firstName + " " + author.lastName}
        ></meta>
        <meta
          name="robots"
          content="index,follow,max-image-preview:large"
        ></meta>
        <meta property="og:title" content={pageTitle} />
        <meta property="og:site_name" content="GreenOn Software"></meta>
      </Helmet>
      <Layout>
        <Article>
          <Thumbnail thumbnail={thumbnail} title={title} />
          <Tags tags={tags} />
          <Intro>
            <M>{description}</M>
          </Intro>
          <Details>
            <AuthorBadge author={author} />
            <ReadTimeBadge minutes={readTime} />
          </Details>
          <Divider />
          <MDXRenderer>{body}</MDXRenderer>
        </Article>
      </Layout>
    </>
  )
}
