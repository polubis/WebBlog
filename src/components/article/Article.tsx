import React from "react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import styled from "styled-components"
import Link from "../link/Link"
import Button from "../button/Button"
import Layout from "../layout/Layout"
import { Article as ArticleModel } from "../../models/Article"
import Thumbnail from "../article/Thumbnail"
import Tags from "../article/Tags"
import { A, B, Content, M } from "../../ui"
import Intro from "./Intro"
import Loadable from "react-loadable"
import { L_DOWN, L_UP, SM_DOWN } from "../../utils/viewport"
import { SiteMeta } from "../../utils/SiteMeta"

import { Stack } from "./Stack"
import { Reviewers } from "./Reviewers"
import { AuthorBadge } from "../badges/AuthorBadge"
import Badge from "./Badge"
import { formatDistanceStrict } from "date-fns"
import theme from "../../utils/theme"
import { WillBeContinuedBanner } from "./WillBeContinuedBanner"
import { AllDataResponse } from "../../api"
import { Breadcrumbs } from "../breadcrumbs"
import { ReadInOtherLanguageBanner } from "./ReadInOtherLanguageBanner"
import { useModal } from "../../ui/modal/Modal"
import { useCustomGAEvent } from "../../utils/useCustomGAEvent"
import { useScrollToTop } from "../../utils/useScrollToTop"
import { ObserveMe } from "../observe-me/ObserveMe"

const ProgressDisplayer = Loadable({
  loader: () => import("./ProgressDisplayer").then(m => m.ProgressDisplayer),
  loading: () => null,
})

const ArticleSource = Loadable({
  loader: () => import("./ArticleSource").then(m => m.ArticleSource),
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

const BottomNavigation = styled.div`
  display: flex;
  justify-content: right;

  & > *:not(:first-child) {
    margin: 0 0 0 20px;
  }

  .article-source-button {
    @media ${L_DOWN} {
      display: none;
    }
  }

  @media ${SM_DOWN} {
    flex-flow: column;

    & > *:not(:first-child) {
      margin: 20px 0 0 0;
    }

    button {
      width: 100%;
    }
  }
`
const Article = styled.main`
  display: flex;
  flex-flow: column;
  margin: 0 auto;

  @media ${L_UP} {
    width: 920px;
  }

  .ui-banner {
    margin-bottom: 28px;
  }

  .components-article-tags {
    margin: 62px 0px 28px;
  }

  .observe-me {
    margin: 32px 0 0 0;
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

export default function ({
  pageContext: { article, site, translationObject, footerArticles },
}: Props) {
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
    isNew,
    readTime,
    next,
    previous,
    translations,
    lang,
    rawBody,
    seniorityLevel,
  } = article

  const t = translationObject[lang]
  const { track } = useCustomGAEvent()
  const articleSourceModal = useModal()

  useScrollToTop()

  const handleSourceOpen = () => {
    articleSourceModal.open()
    track({ name: "article_source_clicked" })
  }

  return (
    <SiteMeta
      siteName={site.siteName}
      siteLang={site.langs.en.html}
      gaPage={gaPage}
      url={gaPage + "/"}
      robots="index,follow,max-image-preview:large"
      title={title}
      type="article"
      author={author.firstName + " " + author.lastName}
      description={description}
      image={thumbnail.src}
    >
      <Layout articles={footerArticles} t={t} routes={site.routes}>
        <Content paddingY>
          <Article>
            {translations.length > 0 && (
              <ReadInOtherLanguageBanner
                text="This article is also published in polish language."
                url={translations[0].path}
                linkLabel="Change language"
              />
            )}
            {toBeContinuedDate && <WillBeContinuedBanner />}
            <Breadcrumbs
              items={[
                { label: "Home", path: "/" },
                { label: "Articles", path: "/articles/" },
                { label: article.title, path: article.path },
              ]}
            />

            <Thumbnail
              graphicAuthorLink={graphicAuthorLink}
              readTime={readTime}
              thumbnail={thumbnail}
              title={title}
              isNew={isNew}
              seniorityLevel={seniorityLevel}
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
            {author.linkedinURL !== undefined && (
              <ObserveMe
                author={author}
                header={t.observeMeHeader}
                description={
                  <>
                    {t.observeMeDescriptionFirstPart}{" "}
                    <A href={author.linkedinURL!} outside>
                      LinkedIn
                    </A>
                    , {t.observeMeDescriptionSecondPart}
                  </>
                }
                btnTitle={t.followMe}
              />
            )}
            <Dates>
              <Badge color={theme.secondary}>
                created: {formatDistanceStrict(new Date(createdAt), new Date())}{" "}
                ago
              </Badge>
              <Badge color={theme.secondary}>
                updated:{" "}
                {formatDistanceStrict(new Date(modifiedAt), new Date())} ago
              </Badge>
            </Dates>
            <BottomNavigation>
              <Button
                className="article-source-button"
                onClick={handleSourceOpen}
              >
                {t.showSource}
              </Button>

              {previous && (
                <Link to={previous.path}>
                  <Button>Previous</Button>
                </Link>
              )}

              {next && (
                <Link to={next.path}>
                  <Button>Next</Button>
                </Link>
              )}
            </BottomNavigation>
          </Article>
        </Content>
        <ProgressDisplayer labels={t.progressDisplay} />

        {articleSourceModal.isOpen && (
          <ArticleSource source={rawBody} onClose={articleSourceModal.close} />
        )}
      </Layout>
    </SiteMeta>
  )
}
