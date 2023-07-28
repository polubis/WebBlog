import React from "react"
import { DEFAULT_SETUP } from "../../../../components/timeline/setup"
import { Timeline } from "../../../../components/timeline"
import { useHomePageProvider } from "../HomePageProvider"

const SETUP = {
  ...DEFAULT_SETUP,
  padding: "40px 0 20px 0",
}

const TimelineSection = () => {
  const home = useHomePageProvider()

  return <Timeline data={home.timeline} setup={SETUP} />
}

export { TimelineSection }
