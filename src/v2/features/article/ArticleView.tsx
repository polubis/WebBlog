import React from "react"
import { L_UP } from "../../../utils/viewport"
import styled from "styled-components"
import { Content, M } from "../../../ui"
import Intro from "../../../components/article/Intro"
import { useScrollToTop } from "../../../utils/useScrollToTop"
import Thumbnail from "../../../components/article/Thumbnail"
import Layout from "../../containers/Layout"
import { useLayoutProvider } from "../../providers/LayoutProvider"
import { ReadInOtherLanguageBanner } from "../../../components/article/ReadInOtherLanguageBanner"
import { Stack } from "../../../components/article/Stack"
import { ArticleBreadcrumbs } from "../../containers/ArticleBreadcrumbs"
import { Reviewers } from "../../components/Reviewers"
import { MdxProvider } from "../../providers/MdxProvider"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { SummaryFooter } from "../../containers/SummaryFooter"
import { RatingSection } from "../../containers/RatingSection"
import { useArticleProvider } from "../../providers/ArticleProvider"
import { Tags } from "../../components/Tags"

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

  .article-view-rating-section {
    margin: 16px 0 24px 0;
    justify-content: flex-end;
  }
`

const ArticleView = () => {
  useScrollToTop()
  const layout = useLayoutProvider()
  const { state: article } = useArticleProvider()

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
          <RatingSection className="article-view-rating-section" />
          <Thumbnail
            seniorityTitle={layout.t[article.seniority]}
            readTime={article.duration}
            thumbnail={article.thumbnail.full}
            title={article.title}
            thumbnailAlt={layout.t.article_thumbnail}
            isNew={article.is_new}
            newLabel={layout.t.new}
            seniorityLevel={article.seniority}
          />
          <Tags>
            {article.tags.map(tag => (
              <h6 key={tag}>{tag}</h6>
            ))}
          </Tags>
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
