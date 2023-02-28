import React from "react"
import { Banner } from "../../ui"
import { useTimer } from "../../utils/useTimer"

interface WillBeContinuedBannerProps {
  date: Date
}

export const WillBeContinuedBanner = ({ date }: WillBeContinuedBannerProps) => {
  const time = useTimer(date)

  if (time.status === "DONE")
    return (
      <Banner>
        This article will be even bigger. There are {time.value} left until the
        next publication. 🚀
      </Banner>
    )

  return <Banner>I got something for you... 🚀</Banner>
}
