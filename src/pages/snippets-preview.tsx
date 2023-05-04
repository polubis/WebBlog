import React, { useMemo } from "react"
import { EditableSnippet } from "../ui"

export default function (): React.ReactElement {
  const mdx = useMemo(() => {
    let searchParams = new URLSearchParams(window.location.search)
    let parameterValue = searchParams.get("code")

    return parameterValue ? decodeURIComponent(parameterValue) : null
  }, [])

  if (mdx === null) {
    return <div>Something is wrong</div>
  }

  return (
    <>
      <p style={{ color: "white" }}>{mdx.length}</p>
      <EditableSnippet value={mdx} onChange={() => {}} />
    </>
  )
}
