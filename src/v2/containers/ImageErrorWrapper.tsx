import React, { useEffect } from "react"
import { ImagePlaceholder } from "./ImagePlaceholder"
import type { ImageErrorWrapperProps } from "./models"
import { useAnalytics } from "../../utils/useAnalytics"
import { useLayoutProvider } from "../providers/LayoutProvider"

const ImageErrorWrapper = ({ src }: ImageErrorWrapperProps) => {
  const { trackFullEvent } = useAnalytics()
  const layout = useLayoutProvider()

  useEffect(() => {
    const url = window.location.pathname + window.location.search

    if (url.includes(layout.routes.creator.to)) {
      return
    }

    trackFullEvent({
      name: "rendering_image_error",
      src,
      category: "errors",
      url,
    })
  }, [])

  return <ImagePlaceholder label="smth_wrong" />
}

export { ImageErrorWrapper }
