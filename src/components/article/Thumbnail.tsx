import React from "react"
import styled from "styled-components"
import Image from "gatsby-image"

import { ReadTimeIcon, XXL } from "../../ui"
import { ArticleThumbnail } from "../../models/Article"
import Badge from "./Badge"
import theme from "../../utils/theme"

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
  align-items: center;
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 10;

  ${Badge} {
    margin: 0 0 10px 10px;
  }

  .read-time-badge {
    display: flex;
    align-items: center;

    & > *:first-child {
      margin-right: 2px;
      width: 14px;
      height: 14px;
    }
  }
`

interface Props {
  title: string
  thumbnail: ArticleThumbnail
  readTime: number
}

export default function ({
  title,
  thumbnail,
  readTime,
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
        <Badge className="read-time-badge" color={theme.secondary}>
          <ReadTimeIcon />
          {readTime}m
        </Badge>
        <Badge color={theme.green}>new</Badge>
      </Badges>
    </Figure>
  )
}
