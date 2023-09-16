import React from "react"
import styled from "styled-components"
import { image_height } from "./consts"
import c from "classnames"

const Container = styled.div`
  min-height: ${image_height}px;
  position: relative;

  & > * {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
`

const ImageWrapper = ({ className, children }) => {
  const classes = c("mdx-component-image-wrapper", className)
  return <Container className={classes}>{children}</Container>
}

export { ImageWrapper }
