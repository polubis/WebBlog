import React, { ReactNode, useMemo } from "react"
import { MDXProvider } from "@mdx-js/react"

const default_components = {
  p: ({ children }: { children: ReactNode }) => {
    return <p>{children}</p>
  },
  h1: ({ children }: { children: ReactNode }) => {
    return <h1>{children}</h1>
  },
  h2: ({ children }: { children: ReactNode }) => {
    return <h2>{children}</h2>
  },
  h3: ({ children }: { children: ReactNode }) => {
    return <h3>{children}</h3>
  },
  h4: ({ children }: { children: ReactNode }) => {
    return <h4>{children}</h4>
  },
  h5: ({ children }: { children: ReactNode }) => {
    return <h5>{children}</h5>
  },
  h6: ({ children }: { children: ReactNode }) => {
    return <h6>{children}</h6>
  },
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
