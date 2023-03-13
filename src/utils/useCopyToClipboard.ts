import { useState } from "react"

type CopiedValue = string | null
type CopyFn = (text: string) => Promise<boolean>

export const useCopyToClipboard = () => {
  const [text, setText] = useState<CopiedValue>(null)

  const copy: CopyFn = async value => {
    if (!navigator?.clipboard) {
      console.warn("Clipboard not supported")
      return false
    }

    try {
      await navigator.clipboard.writeText(value)
      setText(value)
      return true
    } catch (error) {
      console.warn("Copy failed", error)
      setText(null)
      return false
    }
  }

  return { copy, text }
}
