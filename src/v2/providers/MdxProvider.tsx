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
  InjectedPreProps,
  StaticCodeProps,
} from "../ui/code/models"
import { Interactive } from "../ui/code/Interactive"
import { TinyButton } from "../ui/code/TinyButton"
import { useLayoutProvider } from "./LayoutProvider"
import styled from "styled-components"
import { pre_config } from "../ui/code/consts"

const CodeHeaderContainer = styled.div`
  height: ${pre_config.header_height}px;
  padding: 8px 12px;
  background: #3e4360;
  border-top-left-radius: 4px;
  border-bottom: 1px solid #6c6c6e;
  border-top-right-radius: 4px;
`

const CodeHeader = ({ copy }: InjectedPreProps) => {
  const layout = useLayoutProvider()

  return (
    <CodeHeaderContainer>
      <Interactive>
        {({ active, start }) => (
          <TinyButton
            onClick={() => {
              start()
              copy()
            }}
          >
            {active ? `✂️ ${layout.t.copied}` : `✂️ ${layout.t.copy}`}
          </TinyButton>
        )}
      </Interactive>
    </CodeHeaderContainer>
  )
}

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
