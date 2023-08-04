import React, { ReactNode, useMemo } from "react"
import { MDXProvider } from "@mdx-js/react"

import Section from "../../components/article/Section"
import Summary from "../../components/article/Summary"
import Prelude from "../../components/article/Prelude"
import { Example } from "../../components/article/Example"
import Img from "../../components/article/Img"
import { XL, M, Hint, A, B } from "../../ui/text"
import { List } from "../../components/article/List"
import { L, Li } from "../../components/article/L"
import { Demo } from "../components/mdx/Demo"
import { Code } from "../ui/code/Code"
import { CodePlaceholder } from "../containers/CodePlaceholder"
import { useCustomGAEvent } from "../../utils/useCustomGAEvent"
import type {
  CodeProps,
  DynamicCodeProps,
  StaticCodeProps,
} from "../ui/code/models"
import { CodeHeader } from "../containers/CodeHeader"
import { CodeRoller } from "../containers/CodeRoller"

const DynamicCode = (props: DynamicCodeProps) => {
  const { track } = useCustomGAEvent()

  return (
    <Code
      {...props}
      animated
      Error={() => <CodePlaceholder label="smth_wrong" />}
      Loading={() => <CodePlaceholder label="loading" />}
      onError={() => {
        track({ name: "rendering_code_error", link: props.src })
      }}
      Header={CodeHeader}
      Roller={CodeRoller}
    />
  )
}

const StaticCode = (props: StaticCodeProps) => {
  return (
    <Code
      {...props}
      animated
      Header={CodeHeader}
      Loading={() => <CodePlaceholder label="loading" />}
      Roller={CodeRoller}
    />
  )
}

const default_components = {
  Section,
  Summary,
  Prelude,
  Code: (props: CodeProps) => {
    if (props.mode === "static") {
      return <StaticCode {...props} />
    }

    return <DynamicCode {...props} />
  },
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
