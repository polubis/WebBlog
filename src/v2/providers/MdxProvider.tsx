import React, { ReactNode, useMemo } from "react"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"

import Section from "../../components/article/Section"
import Summary from "../../components/article/Summary"
import Prelude from "../../components/article/Prelude"
import { Example } from "../../components/article/Example"
import Img from "../../components/article/Img"
import { XL, M, Hint, A, B } from "../../ui/text"
import { List } from "../../components/article/List"
import { L, Li } from "../../components/article/L"

const default_components = {
  Section,
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
  L,
  Li,
}

interface MdxProviderProps {
  children: string
  components?: Record<string, (props: any) => ReactNode>;
  Renderer: any;
}

const MdxRenderer = MDXRenderer

const MdxProvider = ({ children, components = {}, Renderer = MdxRenderer }: MdxProviderProps) => {
  const cmps = useMemo(() => ({
    ...default_components,
    ...components
  }), [])

  return <MDXProvider components={cmps}>
    <Renderer>{children}</Renderer>
  </MDXProvider>
}


export { MdxProvider }
