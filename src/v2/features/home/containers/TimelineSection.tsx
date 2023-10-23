import React from "react"
import { useHomePageProvider } from "../HomePageProvider"
import { Timeline } from "../../../../components/timeline/Timeline"

const SETUP = {
  padding: "40px 0 20px 0",
}

const TimelineSection = () => {
  const home = useHomePageProvider()

  return <Timeline data={home.timeline} setup={SETUP} />
}

export { TimelineSection }
