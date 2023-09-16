import React from "react"
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
import { Image } from "../../mdx-components/image/Image"
import { ImageRoller } from "../../containers/ImageRoller"
import { ImagePlaceholder } from "../../containers/ImagePlaceholder"

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
    translation_path,
    body,
    technologies,
  } = useArticleProvider()

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
            <Image
              src="https://raw.githubusercontent.com/polubis/Dream-stack-for-React-dev/lesson/Hiding-window-and-HTML-element-scroll-with-the-useScrollHide-hook/hook-demo.gif"
              performant
              border
              alt="My image"
              title="Title"
              description="My text"
              Error={() => <ImagePlaceholder label="smth_wrong" />}
              Loading={() => <ImagePlaceholder label="loading" />}
              Roller={toggler => <ImageRoller onExpand={toggler.open} />}
            />
            <Image
              src="https://raw.githubusercontent.com/polubis/Dream-stack-for-React-dev/lesson/Hiding-window-and-HTML-element-scroll-with-the-useScrollHide-hook/hook-demo.gif"
              description="My text"
              alt="My image"
              title="Title"
              Error={() => <ImagePlaceholder label="smth_wrong" />}
              Loading={() => <ImagePlaceholder label="loading" />}
              Roller={toggler => <ImageRoller onExpand={toggler.open} />}
            />
            <Image
              src="https://raw.githubusercontent.com/polubis/Dream-stack-for-React-dev/lesson/Hiding-window-and-HTML-element-scroll-with-the-useScrollHide-hook/hook-demo.gif"
              performant
              alt="My image"
              title="Title"
              Error={() => <ImagePlaceholder label="smth_wrong" />}
              Loading={() => <ImagePlaceholder label="loading" />}
              Roller={toggler => <ImageRoller onExpand={toggler.open} />}
            />
            <Image
              border
              src="https://drive.google.com/uc?export=view&id=17i6JJvqhvrPtY8cGZj_jXN-rbv_p6NHY"
              description="My text"
              alt="My image"
              title="Title"
              Error={() => <ImagePlaceholder label="smth_wrong" />}
              Loading={() => <ImagePlaceholder label="loading" />}
              Roller={toggler => <ImageRoller onExpand={toggler.open} />}
            />
            <MdxProvider renderer={MDXRenderer}>{body}</MdxProvider>
            <ArticleFooter />
          </ArticleContent>
        </Content>
      </Layout>
      <ProgressDisplayer labels={layout.t.progress_display} />
    </>
  )
}

export { ArticleView }
