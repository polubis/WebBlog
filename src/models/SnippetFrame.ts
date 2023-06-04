interface SnippetFrame {
  id: number
  code: string
  animation: {
    displayTime: number
    type: "slideRight" | "opacity" | "slideLeft"
  }
}

export { SnippetFrame }
