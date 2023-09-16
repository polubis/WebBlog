interface MarkdownFormatterProps {
  code: string
  onFormat(code: string): void
}

interface ToolboxProps extends MarkdownFormatterProps {}

interface LinkPopoverFormData {
  url: string
  title: string
}

export type { MarkdownFormatterProps, ToolboxProps, LinkPopoverFormData }
