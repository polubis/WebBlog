import React, { useMemo } from "react"
import { ImagePlaceholder } from "./ImagePlaceholder"
import Loadable from "react-loadable"
import { useIsVisible } from "../../utils/useIsVisible"
import { ImageRoller } from "./ImageRoller"
import { ImageWrapper } from "../ui/image/ImageWrapper"
import { ImageContainerProps } from "./models"
import { useLayoutProvider } from "../providers/LayoutProvider"
import { ImageErrorWrapper } from "./ImageErrorWrapper"

const ImageContainer = (props: ImageContainerProps) => {
  const { isVisible, ref } = useIsVisible({
    threshold: 0.1,
    useOnce: true,
  })

  const layout = useLayoutProvider()

  const LoadingNode = (
    <ImageWrapper description={props.description}>
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
      title={layout.t.preview}
      alt={layout.t.preview}
      Error={() => <ImageErrorWrapper src={props.src} />}
      Loading={() => <ImagePlaceholder label="loading" />}
      Roller={toggler => <ImageRoller onExpand={toggler.open} />}
    />
  ) : (
    <div ref={ref}>{LoadingNode}</div>
  )
}

export { ImageContainer }
