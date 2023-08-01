import React from "react"
import { useHomePageProvider } from "../HomePageProvider"
import { useIsVisible } from "../../../../utils/useIsVisible"
import Loadable from "react-loadable"

const Timeline = Loadable({
  loader: () => import("../../../../components/timeline").then(m => m.Timeline),
  loading: () => null,
})

const SETUP = {
  padding: "40px 0 20px 0",
}

const style = {
  height: "441px",
}

const TimelineSection = () => {
  const home = useHomePageProvider()
  const { isVisible, ref } = useIsVisible({ useOnce: true, threshold: 0.1 })

  return (
    <div ref={ref} style={style}>
      {isVisible && <Timeline data={home.timeline} setup={SETUP} />}
    </div>
  )
}

export { TimelineSection }
