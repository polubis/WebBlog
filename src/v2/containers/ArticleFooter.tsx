import React from "react"
import { A } from "../../ui"
import { useLayoutProvider } from "../providers/LayoutProvider"
import Button from "../../components/button/Button"
import { useArticleProvider } from "../features/article/ArticleProvider"
import { useCustomGAEvent } from "../../utils/useCustomGAEvent"
import Link from "../../components/link/Link"
import { AuthorBadge } from "../../components/badges/AuthorBadge"
import theme from "../../utils/theme"
import Badge from "../../components/article/Badge"
import { ObserveMe } from "../../components/observe-me/ObserveMe"
import { SM_DOWN } from "../../utils/viewport"
import styled from "styled-components"

const Container = styled.div`
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

  .article-bottom-nav {
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
  }
`

const ArticleFooter = () => {
  const layout = useLayoutProvider()
  const article = useArticleProvider()
  const { track } = useCustomGAEvent()

  return (
    <Container>
      <div className="row">
        <AuthorBadge author={article.article.author} />
      </div>
      {article.article.author.linkedinURL !== undefined && (
        <ObserveMe
          author={article.article.author}
          header={article.t.observe_me_header}
          description={
            <>
              {article.t.observe_me_description_first_part}{" "}
              <A href={article.article.author.linkedinURL!} outside>
                LinkedIn
              </A>
              , {article.t.observe_me_description_second_part}
            </>
          }
          btnTitle={article.t.observe_me_follow}
        />
      )}
      <div className="article-dates wrap">
        <Badge color={theme.secondary}>{article.dates.created}</Badge>
        <Badge color={theme.secondary}>{article.dates.updated}</Badge>
      </div>
      <div className="article-bottom-nav">
        <A
          href={
            layout.meta.article_source_url +
            "/" +
            article.article.slug +
            (article.article.lang ===
              'en'
              ? layout.meta.en_article_file_name
              : layout.meta.pl_article_file_name)
          }
          outside
        >
          <Button onClick={() => track({ name: "article_source_clicked" })}>
            {layout.t.show_source}
          </Button>
        </A>

        {article.article.previous && (
          <Link to={article.article.previous.path}>
            <Button>{layout.t.prev}</Button>
          </Link>
        )}

        {article.article.next && (
          <Link to={article.article.next.path}>
            <Button>{layout.t.next}</Button>
          </Link>
        )}
      </div>
    </Container>
  )
}

export { ArticleFooter }
