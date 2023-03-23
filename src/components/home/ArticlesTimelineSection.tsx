import React from "react"
import styled from "styled-components"
import { Timeline, TimelineData } from "../timeline"
import { DEFAULT_SETUP } from "../timeline/setup"

const Container = styled.section``

const SETUP = {
  ...DEFAULT_SETUP,
  padding: "40px 0 20px 0",
}

interface ArticlesTimelineSectionProps {
  data: TimelineData
}

const ArticlesTimelineSection = ({ data }: ArticlesTimelineSectionProps) => {
  return (
    <Container>
      <Timeline data={data} setup={SETUP} />
    </Container>
  )
}

export type { ArticlesTimelineSectionProps }

export { ArticlesTimelineSection }
