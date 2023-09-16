import { ImageProps } from "../ui/image/models"

interface ImageContainerProps
  extends Omit<ImageProps, "Error" | "Loading" | "Roller" | "alt" | "title"> {}

interface ImageRollerProps {
  onExpand(): void
}

interface ImageErrorWrapperProps {
  src: string
}

export type { ImageContainerProps, ImageRollerProps, ImageErrorWrapperProps }
