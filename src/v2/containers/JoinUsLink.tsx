import React from "react"
import { useLayoutProvider } from "../providers/LayoutProvider"

const JoinUsLink = () => {
  const layout = useLayoutProvider()

  return (
    <a
      href={layout.discord_url}
      className="button primary upper join-us-link"
      title={layout.t.discord_channel}
      target="_blank"
      rel="noopener noreferrer"
    >
      {layout.t.join}
    </a>
  )
}

export { JoinUsLink }
