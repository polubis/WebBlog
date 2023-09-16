import React, { memo, useEffect } from "react"
import type { ImageProps } from "./models"
import { useToggle } from "../../utils/useToggle"
import { useImageLoad } from "../../utils/useImageLoad"
import { ImageWrapper } from "./ImageWrapper"
import { ImageContent } from "./ImageContent"

const Image = memo(
  ({
    className,
    src,
    description,
    border,
    performant = false,
    title,
    alt,
    Roller,
    Loading,
    Error,
  }: ImageProps) => {
    const toggler = useToggle({ opened: !performant })
    const [image, loadImage] = useImageLoad()

    useEffect(() => {
      loadImage(src)
    }, [])

    const LoaderNode = (
      <ImageWrapper>
        <Loading />
      </ImageWrapper>
    )
    const ErrorNode = (
      <ImageWrapper>
        <Error />
      </ImageWrapper>
    )

    if (toggler.opened) {
      if (image.type === "idle" || image.type === "pending") {
        return LoaderNode
      }

      if (image.type === "fail") return ErrorNode

      return (
        <ImageContent
          src={image.data}
          description={description}
          title={title}
          alt={alt}
          border={border}
          className={className}
        />
      )
    }

    return (
      // The case if user scrolled to image section,
      // but image is really big. So we make it toggleable.
      <ImageWrapper>
        <Roller {...toggler} />
      </ImageWrapper>
    )
  }
)

export { Image }
