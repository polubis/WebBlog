import React from "react"
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
import { Stack } from "../../components/article/Stack"
import { MdxProvider } from "../providers/MdxProvider"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { SummaryFooter } from "./SummaryFooter"
import { Breadcrumbs } from "../components/Breadcrumbs"
import { Link } from "gatsby"

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

  .stack {
    margin: 24px 0 42px 0;
  }

  .article-body-rating-section {
    margin: 16px 0 24px 0;
    justify-content: flex-end;
  }
`

export const ArticleBody = () => {
  const layout = useLayoutProvider()
  const { state: article } = useArticleProvider()
  console.log(article.thumbnail)
  return (
    <Container>
      {article.translation_path && <ReadInOtherLanguageBanner />}
      <Breadcrumbs>
        <Link to={layout.routes.home.to}>{layout.t.home}</Link>
        <Link to={layout.routes.articles.to}>{layout.t.articles}</Link>
        <span>{article.title}</span>
      </Breadcrumbs>
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
    </Container>
  )
}
