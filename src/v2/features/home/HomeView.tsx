import React from "react"
import { useScrollToTop } from "../../../utils/useScrollToTop"
import Layout from "../../containers/Layout"
import { BlackHoleSection } from "./containers/BlackHoleSection"
import { WelcomeSection } from "./containers/WelcomeSection"
import { StatsSection } from "./containers/StatsSection"
import { TimelineSection } from "./containers/TimelineSection"

const HomeView = () => {
  useScrollToTop()

  return (
    <Layout>
      <BlackHoleSection />
      <WelcomeSection />
      <StatsSection />
      <TimelineSection />
    </Layout>
  )
}

export { HomeView }
