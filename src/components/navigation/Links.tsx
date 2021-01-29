import React from "react"
import Link from "../link/Link"

import theme from "../../utils/theme"

const LINKS = [
  "technologies",
  "authors",
  "articles",
  "about",
  "contact",
  "join us",
]

interface Props {
  str: number
  end?: number
}

export default function ({
  str,
  end = LINKS.length,
}: Props): React.ReactElement {
  return (
    <>
      {LINKS.slice(str, end).map((link, i) => (
        <Link
          to={`/${link}/`}
          key={link}
          activeStyle={{ color: theme.primary }}
        >
          {link}
        </Link>
      ))}
    </>
  )
}
