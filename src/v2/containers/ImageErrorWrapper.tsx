import React, { useEffect } from "react"
import { useCustomGAEvent } from "../../utils/useCustomGAEvent"
import { ImagePlaceholder } from "./ImagePlaceholder"
import type { ImageErrorWrapperProps } from "./models"

const ImageErrorWrapper = ({ src }: ImageErrorWrapperProps) => {
  const { track } = useCustomGAEvent()

  useEffect(() => {
    track({ name: "rendering_image_error", link: src })
  }, [])

  return <ImagePlaceholder label="smth_wrong" />
}

export { ImageErrorWrapper }