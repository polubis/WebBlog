import React from "react"
import { A, M, S, XL } from "../../../../ui"
import { useLayoutProvider } from "../../../providers/LayoutProvider"
import { useArticleProvider } from "../ArticleProvider"
import { useCustomGAEvent } from "../../../../utils/useCustomGAEvent"
import { ObserveMe } from "../../../components/ObserveMe"
import { SM_DOWN } from "../../../../utils/viewport"
import { Link } from "gatsby"
import styled from "styled-components"
import AuthorAvatar from "../../../../components/article/AuthorAvatar"
import { format } from "date-fns"
import theme from "../../../../utils/theme"
import Badge from "../../../../components/article/Badge"
import { NavigationSection } from "../../../components/NavigationSection"
import { useIsVisible } from "../../../../utils/useIsVisible"
import Loadable from "react-loadable"

const Container = styled.div`
  .observe-me {
    margin: 32px 0 20px 0;
  }

  .section {
    background: #272727;
    padding: 28px;
    border-radius: 4px;
    max-width: 700px;
    transform: translateX(-20px);
    width: calc(100% + 40px);

    ${M} {
      margin: 12px 0 24px 0;
    }
  }

  .dates {
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

  .author-personality {
    margin-left: 16px;
  }
`

const CommentsBox = () => {
  const article = useArticleProvider()

  return (
    <div className="section">
      <XL>{article.t.comments.header}</XL>
      <M>{article.t.comments.description}</M>
      <button title={article.t.comments.open} className="upper button primary">
        {article.t.comments.open}
      </button>
    </div>
  )
}

const ArticleComments = Loadable({
  loader: () => import("./ArticleComments").then(m => m.ArticleComments),
  loading: () => <CommentsBox />,
})

const CommentsWrapper = () => {
  const { ref, isVisible } = useIsVisible({ threshold: 0.1, useOnce: true })

  if (isVisible) {
    return <ArticleComments />
  }

  return (
    <div ref={ref}>
      <CommentsBox />
    </div>
  )
}

const ArticleFooter = () => {
  const layout = useLayoutProvider()
  const article = useArticleProvider()
  const { track } = useCustomGAEvent()

  return (
    <Container>
      <div className="row">
        <Link to={layout.routes.authors.to}>
          <div className="clickable row">
            <AuthorAvatar avatar={article.author.avatar.small} />
            <div className="author-personality col">
              <M className="cap" bold>
                {article.author.full_name}
              </M>
              <S>{article.author.role}</S>
            </div>
          </div>
        </Link>
      </div>
      {article.author.linkedin_url !== undefined && (
        <ObserveMe
          author={article.author}
          header={article.t.observe_me_header}
          description={
            <>
              {article.t.observe_me_description_first_part}{" "}
              <A href={article.author.linkedin_url!} outside>
                LinkedIn
              </A>
              , {article.t.observe_me_description_second_part}
            </>
          }
          btnTitle={article.t.observe_me_follow}
        />
      )}
      <CommentsWrapper />
      <div className="dates wrap">
        <Badge color={theme.secondary}>
          {layout.t.created}: {format(new Date(article.cdate), "dd-MM-yyyy")}
        </Badge>
        <Badge color={theme.secondary}>
          {layout.t.updated}: {format(new Date(article.mdate), "dd-MM-yyyy")}
        </Badge>
      </div>
      <NavigationSection>
        <a
          href={article.source_url}
          className="button primary upper"
          target="_blank"
          onClick={() => track({ name: "article_source_clicked" })}
        >
          {layout.t.show_source}
        </a>

        {article.prev && (
          <Link to={article.prev.path} className="button primary upper">
            {layout.t.prev}
          </Link>
        )}

        {article.next && (
          <Link to={article.next.path} className="button primary upper">
            {layout.t.next}
          </Link>
        )}
      </NavigationSection>
    </Container>
  )
}

export { ArticleFooter }
