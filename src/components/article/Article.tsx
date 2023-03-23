import React from "react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import styled from "styled-components"

import Layout from "../layout/Layout"
import { Article as ArticleModel } from "../../models/Article"
import Thumbnail from "../article/Thumbnail"
import Tags from "../article/Tags"
import { M } from "../../ui"
import Intro from "./Intro"
import Loadable from "react-loadable"
import { L_UP, M_UP, SM_DOWN, T_UP } from "../../utils/viewport"
import { SiteMeta } from "../../utils/SiteMeta"

import { Stack } from "./Stack"
import { Reviewers } from "./Reviewers"
import { AuthorBadge } from "../badges/AuthorBadge"
import Badge from "./Badge"
import { formatDistanceStrict } from "date-fns"
import theme from "../../utils/theme"

const ProgressDisplayer = Loadable({
  loader: () => import("./ProgressDisplayer").then(m => m.ProgressDisplayer),
  loading: () => null,
})

const WillBeContinuedBanner = Loadable({
  loader: () =>
    import("./WillBeContinuedBanner").then(m => m.WillBeContinuedBanner),
  loading: () => null,
})

const Author = styled.div`
  display: flex;
  align-items: center;
`

const Dates = styled.div`
  display: flex;
  flex-flow: wrap;
`

const Article = styled.main`
  display: flex;
  flex-flow: column;
  margin: 0 auto;
  padding: 48px 0;

  @media ${L_UP} {
    width: 920px;
  }

  .ui-snippet {
    max-width: calc(100vw - 56px);

    @media ${M_UP} {
      max-width: calc(100vw - 84px);
    }

    @media ${T_UP} {
      max-width: calc(100vw - 136px);
    }

    @media ${L_UP} {
      max-width: 920px;
    }
  }

  & > :nth-child(2) {
    margin: 62px 0 28px 0;
  }

  ${Dates} {
    margin: 32px 0 40px 0;

    & > * {
      margin: 0 10px 10px 0;

      @media ${SM_DOWN} {
        width: 100%;
        margin: 0 0 10px 0;
        text-align: center;
      }
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
    article: {
      author,
      thumbnail,
      body,
      slug,
      stack,
      createdAt,
      modifiedAt,
      toBeContinuedDate,
      lingReviewer,
      techReviewer,
      title,
      graphicAuthorLink,
      path,
      description,
      tags,
      readTime,
    },
  } = pageContext

  const formattedSlug = slug.substring(0, slug.length - 1)

  return (
    <SiteMeta
      gaPage={`articles/${formattedSlug}`}
      url={path}
      robots="index,follow,max-image-preview:large"
      title={title}
      type="article"
      author={author.firstName + " " + author.lastName}
      description={description}
      image={thumbnail.src}
    >
      <Layout
        banner={toBeContinuedDate ? <WillBeContinuedBanner /> : undefined}
      >
        <Article>
          <Thumbnail
            graphicAuthorLink={graphicAuthorLink}
            readTime={readTime}
            thumbnail={thumbnail}
            title={title}
          />
          <Tags tags={tags} />
          <Intro>
            <M>{description}</M>
          </Intro>
          <Reviewers
            author={author}
            techReviewer={techReviewer}
            lingReviewer={lingReviewer}
          />
          <Stack items={stack} />
          <MDXRenderer>{body}</MDXRenderer>
          <Author>
            <AuthorBadge author={author} />
          </Author>
          <Dates>
            <Badge color={theme.secondary}>
              created: {formatDistanceStrict(new Date(createdAt), new Date())}{" "}
              ago
            </Badge>
            <Badge color={theme.secondary}>
              updated: {formatDistanceStrict(new Date(modifiedAt), new Date())}{" "}
              ago
            </Badge>
          </Dates>
        </Article>
        <ProgressDisplayer />
      </Layout>
    </SiteMeta>
  )
}
