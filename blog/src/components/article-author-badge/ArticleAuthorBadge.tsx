import React from "react"

import styled from "styled-components"

import theme from "../../utils/theme"
import ArticleAuthorAvatar from "../article-author-avatar/ArticleAuthorAvatar"

const ArticleAuthorBadge = styled.div`
  display: flex;
  align-items: center;
`

const ArticleAuthorBadgeName = styled.strong`
  font-size: 16px;
  font-weight: medium;
  text-transform: capitalize;
  color: ${theme.secondary};
`

const ArticleAuthorBadgeRole = styled.span`
  font-size: 14px;
  margin-top: 6px;
  color: ${theme.secondary};
`

const ArticleAuthorPersonality = styled.div`
  display: flex;
  flex-flow: column;
  margin-left: 14px;
`

interface Props {
  role: string
  name: string
  avatar: string
}

export default function ({ role, name, avatar }: Props): React.ReactElement {
  return (
    <ArticleAuthorBadge>
      <ArticleAuthorAvatar src={avatar} />
      <ArticleAuthorPersonality>
        <ArticleAuthorBadgeName>{name}</ArticleAuthorBadgeName>
        <ArticleAuthorBadgeRole>{role}</ArticleAuthorBadgeRole>
      </ArticleAuthorPersonality>
    </ArticleAuthorBadge>
  )
}
