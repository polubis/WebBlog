import React, { ReactNode, useMemo } from "react"
import { MDXProvider } from "@mdx-js/react"

import Section from "../../components/article/Section"
import Summary from "../../components/article/Summary"
import Prelude from "../../components/article/Prelude"
import { Example } from "../../components/article/Example"
import Img from "../../components/article/Img"
import { XL, M, Hint, A, B } from "../../ui/text"
import { List } from "../../components/article/List"
import { Snippet } from "../../ui/snippet"
import { L, Li } from "../../components/article/L"
import { Demo } from "../components/mdx/Demo"

const default_components = {
  Section,
  Summary,
  Prelude,
  Snippet,
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
  Demo,
}

interface MdxProviderProps {
  children: string
  components?: Record<string, (props: any) => ReactNode>
  renderer: any
}

const MdxProvider = ({
  children,
  components = {},
  renderer,
}: MdxProviderProps) => {
  const cmps = useMemo(
    () => ({
      ...default_components,
      ...components,
    }),
    []
  )

  const Renderer = renderer

  return (
    <MDXProvider components={cmps}>
      <Renderer>{children}</Renderer>
    </MDXProvider>
  )
}

export { MdxProvider }
