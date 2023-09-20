import React, { useEffect } from "react"
import type { ImageProps } from "./models"
import { useToggle } from "../../utils/useToggle"
import { useImageLoad } from "../../utils/useImageLoad"
import { ImageWrapper } from "./ImageWrapper"
import { ImageContent } from "./ImageContent"

const Image = ({
  className,
  src,
  description,
  rolled = false,
  title,
  alt,
  Roller,
  Loading,
  Error,
}: ImageProps) => {
  const toggler = useToggle({ opened: !rolled })
  const [image, loadImage] = useImageLoad()

  useEffect(() => {
    loadImage(src)
  }, [])

  const LoaderNode = (
    <ImageWrapper description={description}>
      <Loading />
    </ImageWrapper>
  )
  const ErrorNode = (
    <ImageWrapper description={description}>
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
        className={className}
      />
    )
  }

  return (
    // The case if user scrolled to image section,
    // but image is really big. So we make it toggleable.
    <ImageWrapper description={description}>
      <Roller {...toggler} />
    </ImageWrapper>
  )
}

export { Image }
