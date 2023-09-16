import React, { memo, useEffect, useMemo } from "react"
import type { ImageProps } from "./models"
import { useIsVisible } from "../../../utils/useIsVisible"
import { useToggle } from "../../utils/useToggle"
import { useImageLoad } from "../../utils/useImageLoad"
import Loadable from "react-loadable"
import { ImageWrapper } from "./ImageWrapper"

const ImageComponent = memo(
  ({
    className,
    src,
    description,
    border,
    performant = false,
    Roller,
    title,
    alt,
    Loading,
    Error,
  }: ImageProps) => {
    const toggler = useToggle({ opened: !performant })
    const { isVisible, ref } = useIsVisible({
      threshold: 0.1,
      useOnce: true,
    })
    const [image, loadImage] = useImageLoad()

    useEffect(() => {
      loadImage(src)
    }, [isVisible])

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

    const ImageContent = useMemo(
      () =>
        Loadable({
          loader: () => import("./ImageContent").then(m => m.ImageContent),
          loading: () => LoaderNode,
        }),
      []
    )

    if (isVisible) {
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
      } else {
        return (
          // The case if user scrolled to image section,
          // but image is really big. So we make it toggleable.
          <ImageWrapper>
            <Roller {...toggler} />
          </ImageWrapper>
        )
      }
    }

    // The case if user scrolled to image section.
    // We want to show loader.
    return <div ref={ref}>{LoaderNode}</div>
  }
)

export { ImageComponent as Image }
