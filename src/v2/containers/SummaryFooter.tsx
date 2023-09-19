import React, { useMemo } from "react"
import { useIsVisible } from "../../utils/useIsVisible"
import styled from "styled-components"
import Loadable from "react-loadable"
import { useLayoutProvider } from "../providers/LayoutProvider"
import type { ArticleBasedDataProviderModel } from "../providers/models"

const config = {
  author_section: 92,
  author_section_margin_bottom: 32,
  observe_me_margin_bottom: 20,
  observe_me_height: 368,
  comments_section_height: 224,
  comments_section_margin_bottom: 20,
  dates_section_height: 64,
  dates_section_margin_bottom: 32,
  navigation_section_item_height: 40,
  navigation_section_item_margin: 20,
}

const Placeholder = styled.div``

const Container = styled.div`
  .authors-section {
    margin-bottom: ${config.author_section_margin_bottom}px;
  }

  .observe-me {
    margin-bottom: ${config.observe_me_margin_bottom}px;
  }

  .comments-section {
    margin-bottom: ${config.comments_section_margin_bottom}px;
  }

  .dates-section {
    margin-bottom: ${config.dates_section_margin_bottom}px;
  }
`

const calculateHeight = ({
  prev,
  next,
  author: { linkedin_url },
}: ArticleBasedDataProviderModel) => {
  let height =
    config.author_section +
    config.author_section_margin_bottom +
    config.comments_section_height +
    config.comments_section_margin_bottom +
    config.dates_section_height +
    config.dates_section_margin_bottom +
    2 * config.navigation_section_item_height +
    config.navigation_section_item_margin

  if (linkedin_url) {
    height += config.observe_me_margin_bottom
    height += config.observe_me_height
  }

  if (prev) {
    height +=
      config.navigation_section_item_height +
      config.navigation_section_item_margin
  }

  if (next) {
    height +=
      config.navigation_section_item_height +
      config.navigation_section_item_margin
  }

  return height
}

const SummaryFooter = (props: ArticleBasedDataProviderModel) => {
  const layout = useLayoutProvider()
  const { isVisible, ref } = useIsVisible({ threshold: 0.1, useOnce: true })

  const height = useMemo(() => calculateHeight(props), [])
  const style = useMemo(() => ({ minHeight: `${height}px` }), [])

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
      <Container style={style}>
        <Content {...props} />
      </Container>
    )
  }

  return (
    <Placeholder ref={ref} style={style}>
      {layout.t.loading}
    </Placeholder>
  )
}

export { SummaryFooter }
