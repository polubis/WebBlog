import React, { useEffect } from "react"
import { ImagePlaceholder } from "./ImagePlaceholder"
import type { ImageErrorWrapperProps } from "./models"
import { useAnalytics } from "../../utils/useAnalytics"
import { useIsInBlogCreator } from "../logic/useIsInBlogCreator"

const ImageErrorWrapper = ({ src }: ImageErrorWrapperProps) => {
  const { trackFullEvent } = useAnalytics()
  const { is, url } = useIsInBlogCreator()

  useEffect(() => {
    if (!is()) {
      return
    }

    trackFullEvent({
      name: "rendering_image_error",
      src,
      message: "Image display failed",
      category: "errors",
      url: url(),
    })
  }, [])

  return <ImagePlaceholder label="smth_wrong" />
}

export { ImageErrorWrapper }
