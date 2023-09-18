import React, { useEffect } from "react"
import { ImagePlaceholder } from "./ImagePlaceholder"
import type { ImageErrorWrapperProps } from "./models"
import { useAnalytics } from "../../utils/useAnalytics"

const ImageErrorWrapper = ({ src }: ImageErrorWrapperProps) => {
  const { track } = useAnalytics()

  useEffect(() => {
    track({ name: "rendering_image_error", link: src })
  }, [])

  return <ImagePlaceholder label="smth_wrong" />
}

export { ImageErrorWrapper }