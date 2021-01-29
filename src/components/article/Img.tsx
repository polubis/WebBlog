import React from "react"
import styled from "styled-components"

import { S } from "./Text"

const Img = styled.figure`
  margin: 24px 0 0 0;

  & > img {
    max-width: 100%;
    max-height: 100%;
  }

  ${S} {
    display: block;
    margin-top: 12px;
  }
`

interface Props {
  src: string
  description: string
}

export default function ({ src, description }: Props): React.ReactElement {
  return (
    <Img>
      <img src={src} alt={description} />
      <S italic>{description}</S>
    </Img>
  )
}
