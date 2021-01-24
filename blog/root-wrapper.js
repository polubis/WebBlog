import React from "react"
import { MDXProvider } from "@mdx-js/react"

import Section from "./src/components/article/Section"
import Code from "./src/components/article/Code"
import Link from "./src/components/article/Link"
import * as Text from "./src/components/article/Text"

const shortcodes = {
  Section,
  Code,
  Link,
  ...Text,
}

export const wrapRootElement = ({ element }) => {
  return <MDXProvider components={shortcodes}>{element}</MDXProvider>
}
