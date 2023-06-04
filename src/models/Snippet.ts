import { SnippetFrame } from "./SnippetFrame"

interface Snippet {
  description: string
  name: string
  id: string
  gifUrl: string
  frames: Omit<SnippetFrame, "id">[]
}

export { Snippet }
