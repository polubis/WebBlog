import React from "react"
import { L_UP } from "../../../utils/viewport"
import styled from "styled-components"
import { Content, M } from "../../../ui"
import Intro from "../../../components/article/Intro"
import { useScrollToTop } from "../../../utils/useScrollToTop"
import { useArticlePageProvider } from "./ArticlePageProvider"
import Thumbnail from "../../../components/article/Thumbnail"
import Layout from "../../containers/Layout"
import { useLayoutProvider } from "../../providers/LayoutProvider"
import { ReadInOtherLanguageBanner } from "../../../components/article/ReadInOtherLanguageBanner"
import { Stack } from "../../../components/article/Stack"
import { ArticleTags } from "../../containers/ArticleTags"
import { ArticleBreadcrumbs } from "../../containers/ArticleBreadcrumbs"
import { Reviewers } from "../../components/Reviewers"
import { MdxProvider } from "../../providers/MdxProvider"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { SummaryFooter } from "../../containers/SummaryFooter"
import { AddVoteSection } from "../../containers/AddVoteSection"
import { CommentsOpener } from "../../containers/CommentsOpener"

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

  .article-view-comments-section {
    margin: 16px 0 24px 0;
    justify-content: flex-end;

    & > *:not(:last-child) {
      margin-right: 12px;
    }
  }
`

const ArticleView = () => {
  useScrollToTop()
  const layout = useLayoutProvider()
  const article = useArticlePageProvider()

  return (
    <Layout>
      <Content>
        <ArticleContent>
          {article.translation_path && (
            <ReadInOtherLanguageBanner
              text={article.t.other_lang_banner_message}
              linkLabel={article.t.other_lang_banner_link}
              url={article.translation_path}
            />
          )}
          <ArticleBreadcrumbs />
          <div className="article-view-comments-section row">
            <CommentsOpener />
            <AddVoteSection />
          </div>
          <Thumbnail
            seniorityTitle={layout.t[article.seniority]}
            readTime={article.read_time}
            thumbnail={article.thumbnail.full}
            title={article.title}
            thumbnailAlt={layout.t.article_thumbnail}
            isNew={article.is_new}
            newLabel={layout.t.new}
            seniorityLevel={article.seniority}
          />
          <ArticleTags />
          <Intro>
            <M>{article.description}</M>
          </Intro>
          <Reviewers
            author={article.author}
            tech={article.tech_reviewer}
            ling={article.ling_reviewer}
            authorLabel={layout.t.author}
            lingLabel={layout.t.linguistic_check}
            techLabel={layout.t.technical_check}
          />
          <Stack className="center" items={article.technologies} />
          <MdxProvider renderer={MDXRenderer}>{article.body}</MdxProvider>
          <SummaryFooter />
        </ArticleContent>
      </Content>
    </Layout>
  )
}

export { ArticleView }
