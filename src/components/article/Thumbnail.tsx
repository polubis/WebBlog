import React from "react"
import styled from "styled-components"
import Image from "gatsby-image"

import { XXL } from "../../ui"
import { ArticleThumbnail } from "../../models/Article"

const Figure = styled.figure`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 320px;
  margin: 0;

  ${XXL} {
    text-shadow: 0 3px 6px rgba(0, 0, 0, 0.51);
    z-index: 2;
    text-align: center;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.49);
    z-index: 1;
  }
`

interface Props {
  title: string
  thumbnail: ArticleThumbnail
}

export default function ({ title, thumbnail }: Props): React.ReactElement {
  return (
    <Figure>
      <Image
        fluid={thumbnail}
        alt="Article thumbnail"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      />
      <XXL>{title}</XXL>
    </Figure>
  )
}
