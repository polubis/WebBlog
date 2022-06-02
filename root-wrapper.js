import React from "react"
import { MDXProvider } from "@mdx-js/react"

import Section from "./src/components/article/Section"
import Code from "./src/components/article/Code"
import Summary from "./src/components/article/Summary"
import Prelude from "./src/components/article/Prelude"
import Example from "./src/components/article/Example"
import Img from "./src/components/article/Img"
import * as Text from "./src/ui/text"
import { List } from "./src/components/article/List"

const shortcodes = {
  Section,
  Code,
  Summary,
  Prelude,
  Example,
  List,
  Img,
  ...Text,
}

export const wrapRootElement = ({ element }) => {
  return <MDXProvider components={shortcodes}>{element}</MDXProvider>
}
