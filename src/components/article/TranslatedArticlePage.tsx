import React from "react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import styled from "styled-components"
import Layout from "../layout/Layout"
import { TranslatedArticle } from "../../models/Article"
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
import { Breadcrumbs } from "../breadcrumbs"
import { ReadInOtherLanguageBanner } from "./ReadInOtherLanguageBanner"

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

  .ui-banner {
    margin-bottom: 28px;
  }

  .components-article-tags {
    margin: 62px 0px 28px;
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
    translatedArticle: TranslatedArticle
  }
}

const getDistanceLabel = (dateAsString: string, label: string) => {
  const distanceLabel = formatDistanceStrict(new Date(dateAsString), new Date())

  return `${label} ${distanceLabel} temu`
    .replace("days", "dni")
    .replace("day", "dzień")
    .replace("months", "miesięcy")
    .replace("month", "miesiąc")
    .replace("years", "lat")
    .replace("year", "rok")
}

export default function ({
  pageContext: { translatedArticle, footerArticles, site, translationObject },
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
    originalArticlePath,
    lang,
  } = translatedArticle

  const t = translationObject[lang]

  return (
    <SiteMeta
      siteName={site.siteName}
      siteLang={site.langs.pl.html}
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
            <ReadInOtherLanguageBanner
              text="Ten artykuł jest również dostępny w wersji angielskiej."
              url={originalArticlePath}
              linkLabel="Zmień język"
            />
            {toBeContinuedDate && <WillBeContinuedBanner />}
            <Breadcrumbs
              items={[
                { label: "Strona główna", path: "/" },
                { label: "Artykuły", path: "/articles/" },
                {
                  label: translatedArticle.title,
                  path: translatedArticle.path,
                },
              ]}
            />

            <Thumbnail
              graphicAuthorLink={graphicAuthorLink}
              readTime={readTime}
              thumbnail={thumbnail}
              title={title}
              isNew={isNew}
              newLabel="nowy"
              graphicAuthorLabel="Autor zdjęcia"
              thumbnailAlt="Zdjęcie artykułu"
            />
            <Tags tags={tags} />
            <Intro>
              <M>{description}</M>
            </Intro>
            <Reviewers
              author={author}
              techReviewer={techReviewer}
              lingReviewer={lingReviewer}
              authorLabel={t.author}
              linguisticCheckLabel={t.linguisticCheck}
              technicalCheckLabel={t.technicalCheck}
            />
            <Stack items={stack} />
            <MDXRenderer>{body}</MDXRenderer>
            <Author>
              <AuthorBadge author={author} />
            </Author>
            <Dates>
              <Badge color={theme.secondary}>
                {getDistanceLabel(createdAt, t.dates.created)}
              </Badge>
              <Badge color={theme.secondary}>
                {getDistanceLabel(modifiedAt, t.dates.updated)}
              </Badge>
            </Dates>
          </Article>
        </Content>
        <ProgressDisplayer labels={t.progressDisplay} />
      </Layout>
    </SiteMeta>
  )
}
