import type { Language } from "prism-react-renderer"
import type { ChangeEventHandler as ReactChangeEventHandler } from "react"

interface MarkdownFormatterProps {
  code: string
  onFormat(code: string): void
}

interface ToolboxProps extends MarkdownFormatterProps {}

interface LanguageFieldProps {
  value: Language
  loading?: boolean
  onChange(language: Language): void
}

interface DescriptionFieldProps {
  value: string
  onChange: ReactChangeEventHandler<HTMLInputElement>
}

export type {
  MarkdownFormatterProps,
  ToolboxProps,
  LanguageFieldProps,
  DescriptionFieldProps,
}
