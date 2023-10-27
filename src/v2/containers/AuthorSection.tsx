import React from "react"
import styled from "styled-components"
import { Link as GatsbyLink } from "gatsby"
import { useLayoutProvider } from "../providers/LayoutProvider"
import AuthorAvatar from "../../components/article/AuthorAvatar"
import { M, S } from "../../ui"
import { M_DOWN } from "../../utils/viewport"
import { useArticleProvider } from "../providers/ArticleProvider"

const Container = styled.div`
  & > *:first-child {
    margin-right: 32px;
  }

  @media ${M_DOWN} {
    justify-content: space-between;

    & > *:first-child {
      margin-right: 16px;
    }
  }

  .author-avatar {
    flex-shrink: 0;
  }

  .author-personality {
    margin-left: 16px;
  }
`

const AuthorSection = () => {
  const layout = useLayoutProvider()
  const { state: data } = useArticleProvider()

  return (
    <Container className="authors-section row">
      <GatsbyLink to={layout.routes.authors.to}>
        <div className="clickable row">
          <AuthorAvatar
            avatar={data.author.avatar.small}
            avatarTitle={data.author.full_name}
          />
          <div className="author-personality col">
            <M bold>{data.author.full_name}</M>
            <S>{data.author.role}</S>
          </div>
        </div>
      </GatsbyLink>
    </Container>
  )
}

export { AuthorSection }
