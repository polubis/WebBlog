import React from "react"
import { A } from "../../ui"
import { useLayoutProvider } from "../providers/LayoutProvider"
import Button from "../../components/button/Button"
import { useArticleProvider } from "../features/article/ArticleProvider"
import { useCustomGAEvent } from "../../utils/useCustomGAEvent"
import { ObserveMe } from "../components/ObserveMe"
import { SM_DOWN } from "../../utils/viewport"
import { Link } from 'gatsby'
import styled from "styled-components"
import { UserBadge } from "../components/UserBadge"
import { Dates } from "./Dates"

const Container = styled.div`
  .observe-me {
    margin: 32px 0 0 0;
  }

  .dates {
    margin: 32px 0 40px 0;
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
        <UserBadge
          avatar={article.author.avatar.small}
          fullName={article.author.full_name}
          role={article.author.role}
        />
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
      <Dates />
      <div className="article-bottom-nav">
        <A href={article.source_url} outside>
          <Button onClick={() => track({ name: "article_source_clicked" })}>
            {layout.t.show_source}
          </Button>
        </A>

        {article.prev && (
          <Link to={article.prev.path}>
            <Button>{layout.t.prev}</Button>
          </Link>
        )}

        {article.next && (
          <Link to={article.next.path}>
            <Button>{layout.t.next}</Button>
          </Link>
        )}
      </div>
    </Container>
  )
}

export { ArticleFooter }