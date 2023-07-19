import React from "react"
import { L_UP, SM_DOWN, T_DOWN, T_UP } from "../../../utils/viewport"
import styled from "styled-components"
import { Content, M } from "../../../ui"
import { Reviewers } from "../../../components/article/Reviewers"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Tags from "../../../components/article/Tags"
import Intro from "../../../components/article/Intro"
import { useScrollToTop } from "../../../utils/useScrollToTop"
import { useArticleProvider } from "./ArticleProvider"
import Thumbnail from "../../../components/article/Thumbnail"
import Layout from "../../containers/Layout"
import { useLayoutProvider } from "../../providers/LayoutProvider"
import { Breadcrumbs } from "../../../components/breadcrumbs/Breadcrumbs"
import { useIsVisible } from "../../../utils/useIsVisible"
import Loadable from "react-loadable"
import { ReadInOtherLanguageBanner } from "../../../components/article/ReadInOtherLanguageBanner"
import { Stack } from "../../../components/article/Stack"

const ArticleFooter = Loadable({
  loader: () =>
    import("../../containers/ArticleFooter").then(m => m.ArticleFooter),
  loading: () => null,
})

const ProgressDisplayer = Loadable({
  loader: () =>
    import("../../../components/article/ProgressDisplayer").then(
      m => m.ProgressDisplayer
    ),
  loading: () => null,
})

const ArticleContent = styled.main`
  margin: 24px auto 0 auto;

  @media ${L_UP} {
    width: 920px;
  }

  .ui-banner {
    margin-bottom: 28px;
  }

  .components-article-tags {
    margin: 62px 0px 28px;
  }

  .article-footer-wrapper {
    height: 500px;

    @media ${T_DOWN} {
      height: 720px;
    }

    @media ${SM_DOWN} {
      height: 760px;
    }
  }

  .article-stack {
    height: 82px;
    margin: 24px 0 42px 0;
  }
`

const ArticleView = () => {
  const layout = useLayoutProvider()
  const { meta } = layout
  const { article, t } = useArticleProvider()

  useScrollToTop()

  const { ref: bottomNavRef, isVisible: isBottomVisible } = useIsVisible({
    threshold: 0.1,
    useOnce: true,
  })

  const { ref: stackRef, isVisible: isStackVisible } = useIsVisible({
    threshold: 0.1,
    useOnce: true,
  })

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
            <div className="article-stack center" ref={stackRef}>
              {isStackVisible && <Stack items={article.stack} />}
            </div>
            <MDXRenderer>{article.body}</MDXRenderer>
            <div className="article-footer-wrapper" ref={bottomNavRef}>
              {isBottomVisible && <ArticleFooter />}
            </div>
          </ArticleContent>
        </Content>
      </Layout>
      <ProgressDisplayer labels={layout.t.progress_display} />
    </>
  )
}

export { ArticleView }
