import React, { useEffect, useState } from "react"
import SyntaxHighlighter from "react-syntax-highlighter"
import { srcery } from "react-syntax-highlighter/dist/esm/styles/hljs"
import { from } from "rxjs"

export const CodeTest = ({ src }: { src: string }) => {
  const [content, setContent] = useState("")

  useEffect(() => {
    const obs$ = from(
      fetch(src).then(res => res.text()) as Promise<string>
    ).subscribe(content => {
      setContent(content)
    })

    return () => {
      obs$.unsubscribe()
    }
  }, [])

  if (!content) {
    return null
  }

  return (
    <SyntaxHighlighter useInlineStyles language="typescript" style={srcery}>
      {content}
    </SyntaxHighlighter>
  )
}
