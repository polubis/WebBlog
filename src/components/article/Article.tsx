import React from "react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import styled from "styled-components"

import Layout from "../layout/Layout"
import { Article as ArticleModel } from "../../models/Article"
import Thumbnail from "../article/Thumbnail"
import Tags from "../article/Tags"
import { Content, M } from "../../ui"
import Intro from "./Intro"
import Loadable from "react-loadable"
import { L_UP, SM_DOWN } from "../../utils/viewport"
import { SiteMeta } from "../../utils/SiteMeta"

import { Stack } from "./Stack"
import { Reviewers } from "./Reviewers"
import { AuthorBadge } from "../badges/AuthorBadge"
import Badge from "./Badge"
import { formatDistanceStrict } from "date-fns"
import theme from "../../utils/theme"
import { WillBeContinuedBanner } from "./WillBeContinuedBanner"
import { AllDataResponse } from "../../api"

const ProgressDisplayer = Loadable({
  loader: () => import("./ProgressDisplayer").then(m => m.ProgressDisplayer),
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

  @media ${L_UP} {
    width: 920px;
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
  pageContext: AllDataResponse & {
    article: ArticleModel
  }
}

export default function ({ pageContext: { article, articles } }: Props) {
  const {
    author,
    thumbnail,
    body,
    stack,
    createdAt,
    modifiedAt,
    toBeContinuedDate,
    lingReviewer,
    techReviewer,
    title,
    graphicAuthorLink,
    description,
    tags,
    gaPage,
    readTime,
  } = article

  return (
    <SiteMeta
      gaPage={gaPage}
      url={gaPage + "/"}
      robots="index,follow,max-image-preview:large"
      title={title}
      type="article"
      author={author.firstName + " " + author.lastName}
      description={description}
      image={thumbnail.src}
    >
      <Layout articles={articles}>
        <Content paddingY>
          <Article>
            {toBeContinuedDate && <WillBeContinuedBanner />}
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
              {"siema Aron"}
              <Badge color={theme.secondary}>
                updated:{" "}
                {formatDistanceStrict(new Date(modifiedAt), new Date())} ago
              </Badge>
            </Dates>
          </Article>
        </Content>
        <ProgressDisplayer />
      </Layout>
    </SiteMeta>
  )
}
