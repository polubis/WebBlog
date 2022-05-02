import React, { useEffect } from "react"
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
import ReactGA from "react-ga4"
import { isInSSR } from "../../utils/isInSSR"

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
    article: { frontmatter, slug, author, body },
  } = pageContext

  const { title, description, tags, readTime } = frontmatter
  console.log(title)
  useEffect(() => {
    if (!isInSSR()) {
      ReactGA.initialize("G-NVC90KSB0J")
      ReactGA.send({ hitType: "pageview", page: window.location.pathname })
    }
  }, [])

  return (
    <Layout>
      <Article>
        <Thumbnail slug={slug} title={title} />
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
  )
}
