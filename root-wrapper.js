import React from "react"
import { MDXProvider } from "@mdx-js/react"

import Section from "./src/components/article/Section"
import { Snippet } from "./src/ui/snippet"
import Summary from "./src/components/article/Summary"
import Prelude from "./src/components/article/Prelude"
import { Example } from "./src/components/article/Example"
import Img from "./src/components/article/Img"
import { XL, M, Hint, A, B } from "./src/ui/text"
import { List } from "./src/components/article/List"

const shortcodes = {
  Section,
  Snippet,
  Summary,
  Prelude,
  Example,
  List,
  Img,
  XL,
  M,
  Hint,
  A,
  B,
}

export const wrapRootElement = ({ element }) => {
  return <MDXProvider components={shortcodes}>{element}</MDXProvider>
}
