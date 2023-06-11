import { SnippetFrame } from "../../models"

export const preserveCode = (code: string, frames: SnippetFrame[]): string => {
  const splitted = frames.map(frame => frame.code.split("\n"))
  const codeSplit = code.split("\n")
  let enhancedCode = code

  const max = splitted.reduce(
    (acc, split) => (acc >= split.length ? acc : split.length),
    0
  )
  const diff = max - codeSplit.length

  for (let i = 0; i < diff; i++) {
    enhancedCode += "\n"
  }

  return enhancedCode
}
