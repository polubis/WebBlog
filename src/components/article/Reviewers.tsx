import React from "react"
import styled from "styled-components"
import { Author } from "../../models"
import theme from "../../utils/theme"
import AuthorAvatar from "./AuthorAvatar"
import { S } from "../../ui"
import { Link } from "gatsby"

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
  author: Author
  techReviewer: Author
  lingReviewer: Author
  authorLabel?: string
  linguisticCheckLabel?: string
  technicalCheckLabel?: string
}

export const Reviewers = ({
  author,
  lingReviewer,
  techReviewer,
  authorLabel = "Author",
  linguisticCheckLabel = "Linguistic check",
  technicalCheckLabel = "Technical check",
}: ReviewersProps) => {
  return (
    <Container className="components-reviewers">
      <Link to="/authors/">
        <AvatarContainer>
          <AuthorAvatar
            avatar={techReviewer.avatar.small.fixed}
          />
          <S>{technicalCheckLabel}</S>
        </AvatarContainer>
      </Link>

      <Link to="/authors/">
        <AvatarContainer>
          <AuthorAvatar
            avatar={author.avatar.medium.fixed}
          />
          <S>{authorLabel}</S>
        </AvatarContainer>
      </Link>

      <Link to="/authors/">
        <AvatarContainer>
          <AuthorAvatar
            avatar={lingReviewer.avatar.small.fixed}
          />
          <S>{linguisticCheckLabel}</S>
        </AvatarContainer>
      </Link>
    </Container>
  )
}
