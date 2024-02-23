import React, { Component } from "react"

import { XYPlot, HexbinSeries } from "react-vis"

import DATA from "./data.json"
import "react-vis/dist/style.css"

const DIMENSIONS = [
  "economy (mpg)",
  "cylinders",
  "displacement (cc)",
  "power (hp)",
  "weight (lb)",
  "0-60 mph (s)",
  "year",
]

class HexbinSizeExample extends Component {
  state = {
    xAxis: 2,
    yAxis: 3,
  }

  render() {
    const { xAxis, yAxis } = this.state
    const data = DATA.map(d => ({
      x: Number(d[DIMENSIONS[xAxis]]),
      y: Number(d[DIMENSIONS[yAxis]]),
    }))

    return (
      <XYPlot width={500} height={300}>
        <HexbinSeries animation sizeHexagonsWithCount radius={20} data={data} />
      </XYPlot>
    )
  }
}

export { HexbinSizeExample }
