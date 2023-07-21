import React from "react"
import { L_UP } from "../../../utils/viewport"
import styled from "styled-components"
import { Content, M } from "../../../ui"
import { Reviewers } from "../../../components/article/Reviewers"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Intro from "../../../components/article/Intro"
import { useScrollToTop } from "../../../utils/useScrollToTop"
import { useArticleProvider } from "./ArticleProvider"
import Thumbnail from "../../../components/article/Thumbnail"
import Layout from "../../containers/Layout"
import { useLayoutProvider } from "../../providers/LayoutProvider"
import { Breadcrumbs } from "../../../components/breadcrumbs/Breadcrumbs"
import { ReadInOtherLanguageBanner } from "../../../components/article/ReadInOtherLanguageBanner"
import { Stack } from "../../../components/article/Stack"
import { ArticleFooter } from "../../containers/ArticleFooter"
import { ProgressDisplayer } from "../../../components/article/ProgressDisplayer"
import { ArticleTags } from "../../containers/ArticleTags"

const ArticleContent = styled.main`
  margin: 24px auto;

  @media ${L_UP} {
    width: 920px;
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
  const layout = useLayoutProvider()
  const { meta } = layout
  const { article, t } = useArticleProvider()

  useScrollToTop()

  return (
    <>
      <Layout>
        <Content>
          <ArticleContent>
            {article.translations.length > 0 && (
              <ReadInOtherLanguageBanner
                text={t.other_lang_banner_message}
                linkLabel={t.other_lang_banner_link}
                url={article.translations[0].path}
              />
            )}
            <Breadcrumbs
              items={[
                { label: layout.t.home, path: meta.routes.home.to },
                { label: layout.t.articles, path: meta.routes.articles.to },
                { label: article.title, path: article.path },
              ]}
            />
            <Thumbnail
              readTime={article.readTime}
              thumbnail={article.thumbnail}
              title={article.title}
              thumbnailAlt={layout.t.article_thumbnail}
              isNew={article.isNew}
              newLabel={layout.t.new}
              seniorityLevel={article.seniorityLevel}
            />
            <ArticleTags />
            <Intro>
              <M>{article.description}</M>
            </Intro>
            <Reviewers
              author={article.author}
              techReviewer={article.techReviewer}
              lingReviewer={article.lingReviewer}
              authorLabel={layout.t.author}
              linguisticCheckLabel={layout.t.linguistic_check}
              technicalCheckLabel={layout.t.technical_check}
            />
            <Stack className='center' items={article.stack} />
            <MDXRenderer>{article.body}</MDXRenderer>
            <ArticleFooter />
          </ArticleContent>
        </Content>
      </Layout>
      <ProgressDisplayer labels={layout.t.progress_display} />
    </>
  )
}

export { ArticleView }
