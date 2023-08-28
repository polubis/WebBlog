import React from "react"
import styled from "styled-components"
import theme from "../../utils/theme"
import { S } from "../../ui"
import { Link } from "gatsby"
import AuthorAvatar from "../../components/article/AuthorAvatar"
import { ReviewersProps } from "./models"

const Container = styled.div`
  & > *:not(:last-child) {
    margin-right: 16px;
  }

  & > :first-child .author-avatar {
    border-left: 4px solid ${theme.primary};
  }

  & > :nth-child(2) .author-avatar {
    border-top: 6px solid ${theme.primary};
  }

  & > :last-child .author-avatar {
    border-right: 4px solid ${theme.primary};
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

export const Reviewers = ({
  author,
  ling,
  tech,
  authorLabel,
  lingLabel,
  techLabel,
}: ReviewersProps) => {
  return (
    <Container className="center components-reviewers">
      <Link to="/authors/">
        <div className="reviewers-avatar-container col">
          <AuthorAvatar
            avatar={tech.avatar.small}
            avatarTitle={tech.full_name}
          />
          <S>{techLabel}</S>
        </div>
      </Link>

      <Link to="/authors/">
        <div className="reviewers-avatar-container col">
          <AuthorAvatar
            avatar={author.avatar.medium}
            avatarTitle={author.full_name}
          />
          <S>{authorLabel}</S>
        </div>
      </Link>

      <Link to="/authors/">
        <div className="reviewers-avatar-container col">
          <AuthorAvatar
            avatar={ling.avatar.small}
            avatarTitle={ling.full_name}
          />
          <S>{lingLabel}</S>
        </div>
      </Link>
    </Container>
  )
}
