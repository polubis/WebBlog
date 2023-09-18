import React, { ReactNode, useMemo } from "react"
import { MDXProvider } from "@mdx-js/react"

import Section from "../../components/article/Section"
import Summary from "../../components/article/Summary"
import Prelude from "../../components/article/Prelude"
import { Example } from "../../components/article/Example"
import { XL, M, Hint, A, B } from "../../ui/text"
import { List } from "../../components/article/List"
import { L, Li } from "../../components/article/L"
import { Demo } from "../components/mdx/Demo"
import { ImageContainer } from "../containers/ImageContainer"
import { CodeContainer } from "../containers/CodeContainer"

const default_components = {
  Section,
  Summary,
  Prelude,
  Code: CodeContainer,
  Example,
  List,
  XL,
  M,
  Hint,
  A,
  B,
  L,
  Li,
  Demo,
  Image: ImageContainer,
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
