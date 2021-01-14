import React from "react"

import styled from "styled-components"

import theme from "../../utils/theme"

const ArticleAuthorAvatar = styled.figure`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  margin: 0;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.14);
  border-radius: 50%;
`

const ArticleAuthorAvatarImg = styled.img`
  max-width: 100%;
  max-height: 100%;
  border-radius: 50%;
`

interface Props {
  src: string
}

export default function ({ src }: Props): React.ReactElement {
  return (
    <ArticleAuthorAvatar>
      <ArticleAuthorAvatarImg src={src} />
    </ArticleAuthorAvatar>
  )
}
