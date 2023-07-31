import type { ReactNode } from "react"
import type { IconButtonProps } from "../../../../ui"
import type { SnippetCreatorT } from "../../../core/models"

interface ConfirmationProps {
  onClose: () => void
  onConfirm: () => void
  children?: ReactNode
}

interface SnippetsErrorsScreenProps {
  onClick?: () => void
}

interface TriggerProps {
  className?: string
  letter: string
  icon: ReactNode
  getTitle: (t: SnippetCreatorT) => string
}

interface TriggerChildProps extends IconButtonProps {}

export type {
  ConfirmationProps,
  SnippetsErrorsScreenProps,
  TriggerChildProps,
  TriggerProps,
}
