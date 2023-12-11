import React, { useMemo } from "react"
import { useLayoutProvider } from "../providers/LayoutProvider"
import { useArticleProvider } from "../providers/ArticleProvider"
import styled from "styled-components"
import { ReadInOtherLanguageBanner } from "../../components/article/ReadInOtherLanguageBanner"
import { RatingSection } from "./RatingSection"
import Thumbnail from "../../components/article/Thumbnail"
import { Tags } from "../components/Tags"
import Intro from "../../components/article/Intro"
import { M } from "../../ui"
import { Reviewers } from "../components/Reviewers"
import { MdxProvider } from "../providers/MdxProvider"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { SummaryFooter } from "./SummaryFooter"
import { Breadcrumbs } from "../components/Breadcrumbs"
import { ArticleBodyProps } from "./models"
import { useScrollToTop } from "../../utils/useScrollToTop"

const Container = styled.div`
  .breadcrumbs {
    margin-bottom: 12px;
  }

  .ui-banner {
    margin-bottom: 28px;
  }

  .tags {
    margin: 62px 0px 28px;
  }

  .components-reviewers {
    margin-bottom: 42px;
  }

  .article-body-rating-section {
    margin: 16px 0 24px 0;
    justify-content: flex-end;
  }
`

export const ArticleBody = ({ breadcrumbs }: ArticleBodyProps) => {
  useScrollToTop()
  const layout = useLayoutProvider()
  const { state: article } = useArticleProvider()

  const tags = useMemo(() => {
    const merged = [
      ...article.tags.map(tag => tag.trim()),
      ...article.technologies.map(({ id }) => id.trim()),
    ]

    return (
      <Tags>
        {[...new Set(merged)].map(tag => (
          <h6 key={tag}>{tag}</h6>
        ))}
      </Tags>
    )
  }, [article.tags, article.technologies])

  return (
    <Container>
      {article.translation_path && <ReadInOtherLanguageBanner />}
      <Breadcrumbs>{breadcrumbs}</Breadcrumbs>
      <RatingSection className="article-body-rating-section" />
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
      {tags}
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
      <MdxProvider renderer={MDXRenderer}>{article.body}</MdxProvider>
      <SummaryFooter />
    </Container>
  )
}
