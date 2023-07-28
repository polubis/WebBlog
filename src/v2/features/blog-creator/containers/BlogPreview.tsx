import React, { memo } from "react"
import MDX from "@mdx-js/runtime"
import { ErrorBoundary } from "../../../../utils/ErrorBoundary"
import { isInSSR } from "../../../../utils/isInSSR"
import { MdxProvider } from "../../../providers/MdxProvider"
import { B, M, XL } from "../../../../ui"
import Section from "../../../../components/article/Section"
import { useBlogCreatorPageProvider } from "../BlogCreatorPageProvider"

const Preview = memo(
  ({
    mdx,
    onError,
    components,
  }: {
    mdx: string
    onError: () => void
    components: Record<string, any>
  }) => (
    <ErrorBoundary key={mdx} fallback={() => <></>} onError={onError}>
      <MdxProvider components={components} renderer={MDX}>
        {mdx}
      </MdxProvider>
    </ErrorBoundary>
  ),
  (prev, curr) => prev.mdx === curr.mdx
)

const Demo = () => {
  const creator = useBlogCreatorPageProvider()

  return (
    <Section>
      <XL>{creator.t.demo_info.heading}</XL>
      <M>
        {creator.t.demo_info.desc} <B>iframe</B>.
      </M>
    </Section>
  )
}

const components = {
  Demo,
}

export const BlogPreview = ({
  mdx,
  onError,
}: {
  mdx: string
  onError: () => void
}) => {
  if (isInSSR()) {
    return null
  }

  return <Preview mdx={mdx} onError={onError} components={components} />
}
