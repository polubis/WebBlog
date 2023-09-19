import React, { useMemo } from "react"
import { useIsVisible } from "../../utils/useIsVisible"
import styled from "styled-components"
import Loadable from "react-loadable"
import { useLayoutProvider } from "../providers/LayoutProvider"
import type { ArticleBasedDataProviderModel } from "../providers/models"
import { summary_footer_config } from "./config"
import { XL } from "../../ui"
import theme from "../../utils/theme"

const Placeholder = styled.div`
  background: rgb(40, 42, 54);
  border-radius: 4px;
`

const Container = styled.div`
  justify-content: center;
  border-top: 2px solid ${theme.grayC};

  .authors-section {
    margin-bottom: ${summary_footer_config.author_section_margin_bottom}px;
  }

  .observe-me {
    margin-bottom: ${summary_footer_config.observe_me_margin_bottom}px;
  }

  .comments-section {
    margin-bottom: ${summary_footer_config.comments_section_margin_bottom}px;
  }

  .dates-section {
    margin-bottom: ${summary_footer_config.dates_section_margin_bottom}px;
  }
`

const calculateHeight = ({
  prev,
  next,
  author: { linkedin_url },
}: ArticleBasedDataProviderModel) => {
  let height =
    summary_footer_config.author_section +
    summary_footer_config.author_section_margin_bottom +
    summary_footer_config.comments_section_height +
    summary_footer_config.comments_section_margin_bottom +
    summary_footer_config.dates_section_height +
    summary_footer_config.dates_section_margin_bottom +
    (2 * summary_footer_config.navigation_section_item_height) +
    summary_footer_config.navigation_section_item_margin

  if (linkedin_url) {
    height += summary_footer_config.observe_me_margin_bottom
    height += summary_footer_config.observe_me_height
  }

  if (prev) {
    height +=
      summary_footer_config.navigation_section_item_height +
      summary_footer_config.navigation_section_item_margin
  }

  if (next) {
    height +=
      summary_footer_config.navigation_section_item_height +
      summary_footer_config.navigation_section_item_margin
  }

  return height
}

const SummaryFooter = (props: ArticleBasedDataProviderModel) => {
  const layout = useLayoutProvider()
  const { isVisible, ref } = useIsVisible({ threshold: 0.1, useOnce: true })

  const height = useMemo(() => calculateHeight(props), [])
  const style = useMemo(() => ({ height: `${height}px` }), [])

  const Content = useMemo(
    () =>
      Loadable({
        loader: () =>
          import("./SummaryFooterContent").then(m => m.SummaryFooterContent),
        loading: () => (
          <Placeholder className="center" style={style}>
            <XL>
              {layout.t.loading}
            </XL>
          </Placeholder>
        ),
      }),
    []
  )

  if (isVisible) {
    return (
      <Container className="col" style={style}>
        <Content {...props} />
      </Container>
    )
  }

  return (
    <Placeholder className="center" ref={ref} style={style}>
      <XL>
        {layout.t.loading}
      </XL>
    </Placeholder>
  )
}

export { SummaryFooter }
