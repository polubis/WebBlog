import React, { lazy, Suspense } from "react"
import { ImagePlaceholder } from "./ImagePlaceholder"
import { useIsVisible } from "../../utils/useIsVisible"
import { ImageRoller } from "./ImageRoller"
import { ImageWrapper } from "../ui/image/ImageWrapper"
import { ImageContainerProps } from "./models"
import { useLayoutProvider } from "../providers/LayoutProvider"
import { ImageErrorWrapper } from "./ImageErrorWrapper"

const Image = lazy(() => import("../ui/image/Image"))

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

  return isVisible ? (
    <Suspense fallback={LoadingNode}>
      <Image
        {...props}
        title={layout.t.preview}
        alt={layout.t.preview}
        Error={() => <ImageErrorWrapper src={props.src} />}
        Loading={() => <ImagePlaceholder label="loading" />}
        Roller={toggler => <ImageRoller onExpand={toggler.open} />}
      />
    </Suspense>
  ) : (
    <div ref={ref}>{LoadingNode}</div>
  )
}

export { ImageContainer }
