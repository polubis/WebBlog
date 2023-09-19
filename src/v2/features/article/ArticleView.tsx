import React, { useMemo } from "react"
import { L_UP } from "../../../utils/viewport"
import styled from "styled-components"
import { Content, M } from "../../../ui"
import Intro from "../../../components/article/Intro"
import { useScrollToTop } from "../../../utils/useScrollToTop"
import { useArticleProvider } from "./ArticleProvider"
import Thumbnail from "../../../components/article/Thumbnail"
import Layout from "../../containers/Layout"
import { useLayoutProvider } from "../../providers/LayoutProvider"
import { ReadInOtherLanguageBanner } from "../../../components/article/ReadInOtherLanguageBanner"
import { Stack } from "../../../components/article/Stack"
import { ArticleFooter } from "./containers/ArticleFooter"
import { ProgressDisplayer } from "../../../components/article/ProgressDisplayer"
import { ArticleTags } from "../../containers/ArticleTags"
import { ArticleBreadcrumbs } from "../../containers/ArticleBreadcrumbs"
import { Reviewers } from "../../components/Reviewers"
import { MdxProvider } from "../../providers/MdxProvider"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { SummaryFooter } from "../../containers/SummaryFooter"
import { ArticleBasedDataProviderModel } from "../../providers/models"

const ArticleContent = styled.main`
  margin: 24px auto;

  @media ${L_UP} {
    width: 920px;
  }

  .breadcrumbs {
    margin-bottom: 12px;
  }

  .ui-banner {
    margin-bottom: 28px;
  }

  .tags {
    margin: 62px 0px 28px;
  }

  .stack {
    margin: 24px 0 42px 0;
  }
`

const ArticleView = () => {
  useScrollToTop()
  const layout = useLayoutProvider()
  const {
    read_time,
    thumbnail,
    t,
    description,
    title,
    is_new,
    seniority,
    author,
    tech_reviewer,
    ling_reviewer,
    path,
    tags,
    translation_path,
    body,
    technologies,
    prev,
    next,
    source_url,
    rate,
    cdate,
    mdate,
  } = useArticleProvider()

  const summaryFooterProps = useMemo(
    (): ArticleBasedDataProviderModel => ({
      seniority,
      author,
      technologies,
      tags: tags.split(","),
      duration: read_time,
      title,
      description,
      prev,
      next,
      path,
      source_url: source_url + "/index.mdx",
      rate,
      cdate,
      mdate,
    }),
    []
  )

  return (
    <>
      <Layout>
        <Content>
          <ArticleContent>
            {translation_path && (
              <ReadInOtherLanguageBanner
                text={t.other_lang_banner_message}
                linkLabel={t.other_lang_banner_link}
                url={translation_path}
              />
            )}
            <ArticleBreadcrumbs />
            <Thumbnail
              seniorityTitle={layout.t[seniority]}
              readTime={read_time}
              thumbnail={thumbnail.full}
              title={title}
              thumbnailAlt={layout.t.article_thumbnail}
              isNew={is_new}
              newLabel={layout.t.new}
              seniorityLevel={seniority}
            />
            <ArticleTags />
            <Intro>
              <M>{description}</M>
            </Intro>
            <Reviewers
              author={author}
              tech={tech_reviewer}
              ling={ling_reviewer}
              authorLabel={layout.t.author}
              lingLabel={layout.t.linguistic_check}
              techLabel={layout.t.technical_check}
            />
            <Stack className="center" items={technologies} />
            <MdxProvider renderer={MDXRenderer}>{body}</MdxProvider>
            <SummaryFooter {...summaryFooterProps} />
            <ArticleFooter />
          </ArticleContent>
        </Content>
      </Layout>
      <ProgressDisplayer labels={layout.t.progress_display} />
    </>
  )
}

export { ArticleView }
