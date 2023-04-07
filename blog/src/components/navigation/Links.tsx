import React from "react"
import Link from "../link/Link"

import theme from "../../utils/theme"

interface Props {
  items: { label: string; url: string }[]
}

export default function ({ items }: Props): React.ReactElement {
  return (
    <>
      {items.map(item => (
        <Link
          to={item.url}
          key={item.url}
          activeStyle={{ color: theme.primary }}
        >
          {item.label}
        </Link>
      ))}
    </>
  )
}
