import React from "react"
import styled from "styled-components"
import { image_height } from "./consts"
import theme from "../../../utils/theme"
import { S } from "../../../ui"
import { ImagePreview } from "./ImagePreview"
import { useToggle } from "../../utils/useToggle"
import c from "classnames"
import { ImageContentProps } from "./models"

const Container = styled.div`
  min-height: ${image_height}px;

  &.border {
    img {
      border-color: ${theme.primary};
    }
  }

  &:hover {
    opacity: 0.9;
  }

  img {
    max-width: 100%;
    max-height: 100%;
    border: 2px solid transparent;
    border-radius: 4px;
    transition: 0.3s transform ease-in-out;
  }

  ${S} {
    margin-top: 12px;
  }
`

const ImageContent = ({
  src,
  description,
  title,
  alt,
  border,
  className,
}: ImageContentProps) => {
  const preview = useToggle()

  return (
    <>
      <Container className={c("mdx-component-image", { border }, className)}>
        <img
          className="clickable"
          src={src}
          onClick={preview.open}
          alt={description || alt}
        />
        {description && (
          <S className="mdx-component-image-description" italic>
            {description}
          </S>
        )}
      </Container>
      {preview.opened && (
        <ImagePreview
          src={src}
          title={title}
          alt={description || alt}
          onClose={preview.close}
        />
      )}
    </>
  )
}

export { ImageContent }
