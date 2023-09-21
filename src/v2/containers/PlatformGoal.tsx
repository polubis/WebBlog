import React from "react"
import Section from "../../components/article/Section"
import { A, B, M, XL } from "../../ui"
import { useLayoutProvider } from "../providers/LayoutProvider"

const PlatformGoal = () => {
  const layout = useLayoutProvider()

  return (
    <Section>
      <XL>{layout.t.platform_goal.header}</XL>
      <M>{layout.t.platform_goal.commit}</M>
      <M>
        {layout.t.platform_goal.at} <B>{layout.site_name}</B>,{" "}
        {layout.t.platform_goal.drive}
      </M>
      <M>
        {layout.t.platform_goal.would_like_to_join}{" "}
        <A outside href={layout.discord_url}>
          {layout.t.discord_channel}
        </A>{" "}
        💫!
      </M>
    </Section>
  )
}

export { PlatformGoal }
