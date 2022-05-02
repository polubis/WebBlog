import React from "react"
import styled, { css } from "styled-components"
import Image from "gatsby-image"

import { ArticleAuthorAvatar } from "../../models/Article"

type AvatarSize = "small" | "medium" | "big"

interface Props {
  size?: AvatarSize
  avatar: ArticleAuthorAvatar
}

const getSize = (size: AvatarSize) => {
  if (size === "small") {
    return {
      height: "50px",
      width: "50px",
    }
  }

  if (size === "medium") {
    return {
      height: "92px",
      width: "92px",
    }
  }

  return {
    height: "200px",
    width: "200px",
  }
}

const AuthorAvatar = styled.figure`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.14);
  border-radius: 50%;
`

export default function ({
  avatar,
  size = "small",
}: Props): React.ReactElement {
  return (
    <AuthorAvatar>
      <Image
        fluid={avatar}
        style={{
          borderRadius: "50%",
          ...getSize(size),
        }}
      />
    </AuthorAvatar>
  )
}
