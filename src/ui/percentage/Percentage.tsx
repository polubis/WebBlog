import React, { useState, useEffect, memo } from "react"
import { M } from "../text"

const Percentage = memo(
  ({ speed = 100 }: { speed?: number }) => {
    const [time, setTime] = useState(0)

    useEffect(() => {
      const interval = setInterval(() => {
        setTime(prevTime => prevTime + 1 === 99 ? 99 : prevTime + 1)
      }, speed)

      return () => clearInterval(interval)
    }, [speed])

    return <M>Loading... {time}%</M>
  },
  () => true
)

export { Percentage }
