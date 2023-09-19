import React, { useMemo } from "react"
import { useIsVisible } from "../../utils/useIsVisible"
import styled from "styled-components"
import Loadable from "react-loadable"
import { useLayoutProvider } from "../providers/LayoutProvider"
import type { ArticleBasedDataProviderModel } from "../providers/models"

const config = {
  author_section: 92,
}

const Placeholder = styled.div`
  background: red;
  border-radius: 4px;
`

const SummaryFooter = (props: ArticleBasedDataProviderModel) => {
  const layout = useLayoutProvider()
  const { isVisible, ref } = useIsVisible({ threshold: 0.1, useOnce: true })

  const height = config.author_section
  const style = { height: `${height}px` }

  const Content = useMemo(
    () =>
      Loadable({
        loader: () =>
          import("./SummaryFooterContent").then(m => m.SummaryFooterContent),
        loading: () => (
          <Placeholder style={style}>{layout.t.loading}</Placeholder>
        ),
      }),
    []
  )

  if (isVisible) {
    return (
      <div style={style}>
        <Content {...props} />
      </div>
    )
  }

  return (
    <Placeholder ref={ref} style={style}>
      {layout.t.loading}
    </Placeholder>
  )
}

export { SummaryFooter }
