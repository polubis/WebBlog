import React from "react"
import { ProgressDisplayer } from "../../../components/article/ProgressDisplayer"
import { L_DOWN, L_UP, SM_DOWN } from "../../../utils/viewport"
import styled from "styled-components"
import { A, Breadcrumbs, Content, M, useModal } from "../../../ui"
import { Reviewers } from "../../../components/article/Reviewers"
import { Stack } from "../../../components/article/Stack"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { ObserveMe } from "../../../components/observe-me/ObserveMe"
import Button from "../../../components/button/Button"
import Link from "../../../components/link/Link"
import theme from "../../../utils/theme"
import Tags from "../../../components/article/Tags"
import Intro from "../../../components/article/Intro"
import { AuthorBadge } from "../../../components/badges"
import Badge from "../../../components/article/Badge"
import { ReadInOtherLanguageBanner } from "../../../components/article/ReadInOtherLanguageBanner"
import { useScrollToTop } from "../../../utils/useScrollToTop"
import { useCustomGAEvent } from "../../../utils/useCustomGAEvent"
import { useArticleProvider } from "./ArticleProvider"
import { WillBeContinuedBanner } from "../../../components/article/WillBeContinuedBanner"
import Thumbnail from "../../../components/article/Thumbnail"
import Layout from "../../containers/Layout"
import { useLayoutProvider } from "../../providers/LayoutProvider"
import { ArticleSource } from "../../components/ArticleSource"

const BottomNavigation = styled.div`
  display: flex;
  justify-content: right;

  & > *:not(:first-child) {
    margin: 0 0 0 20px;
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
const ArticleContent = styled.main`
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

  .article-dates {
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

const ArticleView = () => {
  const layout = useLayoutProvider()
  const { meta } = layout
  const { article, t, dates } = useArticleProvider()
  const { track } = useCustomGAEvent()
  const articleSourceModal = useModal()

  useScrollToTop()

  const handleSourceOpen = () => {
    articleSourceModal.open()
    track({ name: "article_source_clicked" })
  }

  return (
    <Layout>
      <Content paddingY>
        <ArticleContent>
          {article.translations.length > 0 && (
            <ReadInOtherLanguageBanner
              text={t.other_lang_banner_message}
              linkLabel={t.other_lang_banner_link}
              url={article.translations[0].path}
            />
          )}
          {article.toBeContinuedDate && <WillBeContinuedBanner />}
          <Breadcrumbs
            items={[
              { label: layout.t.home, path: meta.routes.home },
              { label: layout.t.articles, path: meta.routes.articles },
              { label: article.title, path: article.path },
            ]}
          />
          <Thumbnail
            graphicAuthorLink={article.graphicAuthorLink}
            readTime={article.readTime}
            thumbnail={article.thumbnail}
            title={article.title}
            thumbnailAlt={layout.t.article_thumbnail}
            isNew={article.isNew}
            graphicAuthorLabel={layout.t.graphic_author_label}
            newLabel={layout.t.new}
            seniorityLevel={article.seniorityLevel}
          />
          <Tags tags={article.tags} />
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
          <Stack items={article.stack} />
          <MDXRenderer>{article.body}</MDXRenderer>
          <div className="row">
            <AuthorBadge author={article.author} />
          </div>
          {article.author.linkedinURL !== undefined && (
            <ObserveMe
              author={article.author}
              header={t.observe_me_header}
              description={
                <>
                  {t.observe_me_description_first_part}{" "}
                  <A href={article.author.linkedinURL!} outside>
                    LinkedIn
                  </A>
                  , {t.observe_me_description_second_part}
                </>
              }
              btnTitle={t.observe_me_follow}
            />
          )}
          <div className="article-dates wrap">
            <Badge color={theme.secondary}>{dates.created}</Badge>
            <Badge color={theme.secondary}>{dates.updated}</Badge>
          </div>
          <BottomNavigation>
            <Button onClick={handleSourceOpen}>{layout.t.show_source}</Button>

            {article.previous && (
              <Link to={article.previous.path}>
                <Button>{layout.t.prev}</Button>
              </Link>
            )}

            {article.next && (
              <Link to={article.next.path}>
                <Button>{layout.t.next}</Button>
              </Link>
            )}
          </BottomNavigation>
        </ArticleContent>
      </Content>

      <ProgressDisplayer labels={layout.t.progress_display} />

      {articleSourceModal.isOpen && (
        <ArticleSource
          source={article.rawBody}
          onClose={articleSourceModal.close}
        />
      )}
    </Layout>
  )
}

export { ArticleView }
