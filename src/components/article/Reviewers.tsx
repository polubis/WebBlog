import React from "react"
import styled from "styled-components"
import { Author } from "../../models"
import theme from "../../utils/theme"
import AuthorAvatar from "./AuthorAvatar"
import { S } from "../../ui"
import { Link } from "gatsby"

const Container = styled.div`
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

  .reviewers-avatar-container {
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
    <Container className="center components-reviewers">
      <Link to="/authors/">
        <div className="reviewers-avatar-container col">
          <AuthorAvatar avatar={techReviewer.avatar.small.fixed} />
          <S>{technicalCheckLabel}</S>
        </div>
      </Link>

      <Link to="/authors/">
        <div className="reviewers-avatar-container col">
          <AuthorAvatar avatar={author.avatar.medium.fixed} />
          <S>{authorLabel}</S>
        </div>
      </Link>

      <Link to="/authors/">
        <div className="reviewers-avatar-container col">
          <AuthorAvatar avatar={lingReviewer.avatar.small.fixed} />
          <S>{linguisticCheckLabel}</S>
        </div>
      </Link>
    </Container>
  )
}
