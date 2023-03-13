import React, { useEffect } from "react"

import Prism from "prismjs"

export const Code = ({
  id,
  code,
  onChange,
}: {
  code: string
  id: string
  onChange: (value: string) => void
}) => {
  useEffect(() => {
    Prism.highlightAll()
  }, [])

  const handleKeyDown = event => {
    if (event.keyCode === 9) {
      event.preventDefault()
    }
  }

  return (
    <pre>
      <code
        id={id}
        className="language-html"
        contentEditable
        onInput={e => {
          onChange(e.currentTarget.innerText)
        }}
        onKeyDown={e => {
          handleKeyDown(e)
        }}
      >
        {code}
      </code>
    </pre>
  )
}
