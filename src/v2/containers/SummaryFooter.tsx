import React, { useMemo } from "react"
import { useIsVisible } from "../../utils/useIsVisible"
import styled from "styled-components"
import Loadable from "react-loadable"
import type { ArticleBasedDataProviderModel } from "../providers/models"
import { summary_footer_config, summary_footer_id } from "../core/consts"
import { useScrollAfterAuth } from "../logic/useScrollAfterAuth"

const Placeholder = styled.div`
  overflow: hidden;

  & > * {
    background: rgb(40, 42, 54);
    border-radius: 4px;

    &:nth-child(1) {
      width: 50%;
      height: ${summary_footer_config.author_section}px;
      margin-bottom: ${summary_footer_config.author_section_margin_bottom}px;
    }

    &:nth-child(2) {
      width: 80%;
      height: ${summary_footer_config.observe_me_height}px;
      margin-bottom: ${summary_footer_config.observe_me_margin_bottom}px;
    }

    &:nth-child(3) {
      width: 80%;
      height: ${summary_footer_config.comments_section_height}px;
      margin-bottom: ${summary_footer_config.comments_section_margin_bottom}px;
    }

    &:nth-child(4) {
      width: 40%;
      height: ${summary_footer_config.dates_section_height}px;
      margin-bottom: ${summary_footer_config.dates_section_margin_bottom}px;
    }

    &:nth-child(5) {
      width: 50%;
      height: ${summary_footer_config.navigation_section_item_height}px;
    }
  }
`

const Container = styled.div`
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
    2 * summary_footer_config.navigation_section_item_height +
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


const placeholderItems = (
  <>
    <div />
    <div />
    <div />
    <div />
    <div />
  </>
)

const SummaryFooter = (props: ArticleBasedDataProviderModel) => {
  const { isVisible, ref } = useIsVisible({ threshold: 0.1, useOnce: true })

  const height = useMemo(() => calculateHeight(props), [])
  const style = useMemo(() => ({ height: `${height}px` }), [])

  useScrollAfterAuth()

  const Content = useMemo(
    () =>
      Loadable({
        loader: () =>
          import("./SummaryFooterContent").then(m => m.SummaryFooterContent),
        loading: () => (
          <Placeholder id={summary_footer_id} className="col" style={style}>
            {placeholderItems}
          </Placeholder>
        ),
      }),
    []
  )

  if (isVisible) {
    return (
      <Container id={summary_footer_id} className="col" style={style}>
        <Content {...props} />
      </Container>
    )
  }

  return (
    <Placeholder id={summary_footer_id} className="col" ref={ref} style={style}>
      {placeholderItems}
    </Placeholder>
  )
}

export { SummaryFooter }
