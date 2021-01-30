import React from "react"
import styled from "styled-components"
import Image from "gatsby-image"

import { ArticleAuthorAvatar } from "../../models/Article"

const AuthorAvatar = styled.figure`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  margin: 0;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.14);
  border-radius: 50%;
`

interface Props {
  avatar: ArticleAuthorAvatar
}

export default function ({ avatar }: Props): React.ReactElement {
  return (
    <AuthorAvatar>
      <Image
        fluid={avatar}
        style={{ width: "50px", height: "50px", borderRadius: "50%" }}
      />
    </AuthorAvatar>
  )
}
