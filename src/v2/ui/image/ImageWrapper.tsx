import React from "react"
import styled from "styled-components"
import { image_height } from "./consts"
import c from "classnames"
import { ImageWrapperProps } from "./models"
import { S } from "../../../ui"

const Container = styled.div`
  .ui-image-wrapper-content {
    min-height: ${image_height}px;
    position: relative;
    border-radius: 4px;
    background: rgb(40, 42, 54);

    & > * {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
    }
  }

  .ui-image-description {
    margin-top: 4px;
  }
`

const ImageWrapper = ({
  className,
  children,
  description,
}: ImageWrapperProps) => {
  const classes = c("ui-image-wrapper", className)
  
  return (
    <Container className={classes}>
      <div className="ui-image-wrapper-content">{children}</div>
      {description && (
        <S className="ui-image-description" italic>
          {description}
        </S>
      )}
    </Container>
  )
}

export { ImageWrapper }
