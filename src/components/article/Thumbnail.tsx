import React from "react"
import styled from "styled-components"
import Img, { FluidObject } from "gatsby-image"

import { XXL } from "../../ui"
import Badge from "./Badge"
import theme from "../../utils/theme"
import { ReadTime } from "../../v2/components/ReadTime"
import { Seniority } from "../../v2/core/models"

const Container = styled.figure`
  position: relative;
  width: 100%;
  min-height: 320px;
  margin: 0;

  .thumbnail-badge {
    align-items: center;
    position: absolute;
    top: 12px;
    right: 12px;
    z-index: 10;

    ${Badge} {
      margin: 0 0 10px 10px;
    }
  }

  ${XXL} {
    text-shadow: 0 3px 6px rgba(0, 0, 0, 0.51);
    z-index: 2;
    text-align: center;
    word-break: break-word;
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

interface Props {
  title: string
  thumbnail: FluidObject
  readTime: number
  isNew: boolean
  newLabel: string
  thumbnailAlt: string
  seniorityLevel: any
  seniorityTitle: string
}

const imgStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  borderRadius: "4px",
}

export default function ({
  title,
  thumbnail,
  readTime,
  isNew,
  newLabel,
  thumbnailAlt,
  seniorityLevel,
  seniorityTitle,
}: Props) {
  return (
    <Container className="center thumbnail">
      <Img
        fluid={thumbnail}
        alt={thumbnailAlt}
        loading="eager"
        style={imgStyle}
      />
      <XXL>
        <span title={seniorityTitle}>{Seniority[seniorityLevel]}</span> {title}
      </XXL>
      <div className="thumbnail-badge wrap">
        <ReadTime time={readTime} />
        {isNew && <Badge color={theme.green}>{newLabel}</Badge>}
      </div>
    </Container>
  )
}
