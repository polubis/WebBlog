import React, { useMemo } from "react"
import { ImagePlaceholder } from "./ImagePlaceholder"
import Loadable from "react-loadable"
import { useIsVisible } from "../../utils/useIsVisible"
import { ImageRoller } from "./ImageRoller"
import { ImageWrapper } from "../ui/image/ImageWrapper"
import { ImageContainerProps } from "./models"

const ImageContainer = (props: ImageContainerProps) => {
  const { isVisible, ref } = useIsVisible({
    threshold: 0.1,
    useOnce: true,
  })

  const LoadingNode = (
    <ImageWrapper>
      <ImagePlaceholder label="loading" />
    </ImageWrapper>
  )

  const Image = useMemo(
    () =>
      Loadable({
        loader: () => import("../ui/image/Image").then(m => m.Image),
        loading: () => LoadingNode,
      }),
    []
  )

  return isVisible ? (
    <Image
      {...props}
      Error={() => <ImagePlaceholder label="smth_wrong" />}
      Loading={() => <ImagePlaceholder label="loading" />}
      Roller={toggler => <ImageRoller onExpand={toggler.open} />}
    />
  ) : (
    <div ref={ref}>{LoadingNode}</div>
  )
}

export { ImageContainer }
