import React from "react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import styled from "styled-components"

import Layout from "../layout/Layout"
import { Article as ArticleModel } from "../../models/Article"
import Thumbnail from "../article/Thumbnail"
import Tags from "../article/Tags"
import { M } from "../../ui"
import Details from "../article/Details"
import { AuthorBadge, ReadTimeBadge } from "../badges"
import Intro from "./Intro"
import Loadable from "react-loadable"
import { L_UP } from "../../utils/viewport"
import { SiteMeta } from "../../utils/SiteMeta"

import { defineCustomElements as deckDeckGoHighlightElement } from "@deckdeckgo/highlight-code/dist/loader"
import { Stack } from "./Stack"

deckDeckGoHighlightElement()

const ProgressDisplayer = Loadable({
  loader: () => import("./ProgressDisplayer").then(m => m.ProgressDisplayer),
  loading: () => null,
})

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

  ${Details} {
    & > :nth-child(2) {
      margin: 0 28px 0 42px;
      flex-shrink: 0;
    }
  }
`

interface Props {
  pageContext: {
    article: ArticleModel
  }
}

export default function ({ pageContext }: Props) {
  const {
    article: { frontmatter, author, thumbnail, body, slug, stack },
  } = pageContext

  const { title, description, tags, readTime } = frontmatter

  const pageTitle = `${title} | by ${author.firstName} ${author.lastName} | GreenOn Software`

  return (
    <SiteMeta
      url={`/articles/${slug}`}
      robots="index,follow,max-image-preview:large"
      title={pageTitle}
      type="article"
      author={author.firstName + " " + author.lastName}
      description={description}
      image={thumbnail.src}
    >
      <Layout>
        <Article>
          <Thumbnail
            thumbnail={thumbnail}
            title={title}
            cdate={frontmatter.cdate}
            mdate={frontmatter.mdate}
          />
          <Tags tags={tags} />
          <Intro>
            <M>{description}</M>
          </Intro>
          <Details>
            <AuthorBadge author={author} />
            <ReadTimeBadge minutes={readTime} />
          </Details>
          <Stack items={stack} />
          <MDXRenderer>{body}</MDXRenderer>
        </Article>
        <ProgressDisplayer />
      </Layout>
    </SiteMeta>
  )
}
