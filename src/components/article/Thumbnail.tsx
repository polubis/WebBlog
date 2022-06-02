import React from "react"
import styled from "styled-components"
import Image from "gatsby-image"

import { XXL } from "../../ui"
import { ArticleThumbnail } from "../../models/Article"
import Badge from "./Badge"
import theme from "../../utils/theme"
import { formatDistanceStrict } from "date-fns"

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
    padding: 0 24px;
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

const Badges = styled.div`
  display: flex;
  flex-flow: wrap;
  justify-content: flex-end;
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 10;

  ${Badge} {
    margin: 0 0 10px 10px;
  }
`

interface Props {
  title: string
  cdate: string
  mdate: string
  thumbnail: ArticleThumbnail
}

export default function ({
  title,
  cdate,
  mdate,
  thumbnail,
}: Props): React.ReactElement {
  return (
    <Figure>
      <Image
        fluid={thumbnail}
        alt="Article thumbnail"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      />
      <XXL>{title}</XXL>
      <Badges>
        <Badge color={theme.secondary}>
          created: {formatDistanceStrict(new Date(cdate), new Date())} ago
        </Badge>
        <Badge color={theme.secondary}>
          updated: {formatDistanceStrict(new Date(mdate), new Date())} ago
        </Badge>
        <Badge color={theme.green}>new</Badge>
      </Badges>
    </Figure>
  )
}
