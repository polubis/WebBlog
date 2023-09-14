interface MarkdownFormatterProps {
  code: string
  onFormat(code: string): void
}

interface ToolboxProps extends MarkdownFormatterProps {}

export type { MarkdownFormatterProps, ToolboxProps }
