import React from "react"
import styled from "styled-components"
import { ArticleAuthor } from "../../models/Article"
import theme from "../../utils/theme"
import AuthorAvatar from "./AuthorAvatar"
import { S } from "../../ui"
import { Link as GatsbyLink } from "gatsby"

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  & > *:not(:last-child) {
    margin-right: 16px;
  }

  & > :first-child {
    .author-avatar {
      border-left: 4px solid ${theme.primary};
    }
  }

  & > :nth-child(2) {
    .author-avatar {
      border-top: 6px solid ${theme.primary};
    }
  }

  & > :last-child {
    .author-avatar {
      border-right: 4px solid ${theme.primary};
    }
  }
`

const AvatarContainer = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;

  .author-avatar {
    border-radius: 50%;
    flex-shrink: 0;
    margin-bottom: 8px;
    cursor: pointer;
  }

  ${S} {
    text-align: center;
  }
`

export interface ReviewersProps {
  author: ArticleAuthor
  techReviewer: ArticleAuthor
  lingReviewer: ArticleAuthor
}

export const Reviewers = ({
  author,
  lingReviewer,
  techReviewer,
}: ReviewersProps) => {
  return (
    <Container>
      <GatsbyLink to="/authors/">
        <AvatarContainer>
          <AuthorAvatar
            avatar={techReviewer.avatar}
            title={techReviewer.firstName + " " + techReviewer.lastName}
            alt={techReviewer.firstName + " " + techReviewer.lastName}
          />
          <S>Technical check</S>
        </AvatarContainer>
      </GatsbyLink>

      <GatsbyLink to="/authors/">
        <AvatarContainer>
          <AuthorAvatar
            avatar={author.avatar}
            size="medium"
            title={author.firstName + " " + author.lastName}
            alt={author.firstName + " " + author.lastName}
          />
          <S>Author</S>
        </AvatarContainer>
      </GatsbyLink>

      <GatsbyLink to="/authors/">
        <AvatarContainer>
          <AuthorAvatar
            avatar={lingReviewer.avatar}
            title={lingReviewer.firstName + " " + lingReviewer.lastName}
            alt={lingReviewer.firstName + " " + lingReviewer.lastName}
          />
          <S>Linguistic check</S>
        </AvatarContainer>
      </GatsbyLink>
    </Container>
  )
}
