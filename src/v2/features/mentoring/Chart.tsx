import React, { Component } from "react"
import DATA from "./data.json"
import "react-vis/dist/style.css"
import { XYPlot, HexbinSeries } from "react-vis"
import styled from "styled-components"

function updateData() {
  return DATA.map(row => ({
    waiting: row.waiting + (Math.random() - 0.5) * 10,
    eruptions: row.eruptions + (Math.random() - 0.5) * 2,
  }))
}

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
`

class HexbinSizeExample extends Component {
  state = {
    data: DATA,
    hoveredNode: null,
    radius: 10,
    offset: 0,
  }

  componentDidMount(): void {
    setInterval(() => {
      this.setState({ data: updateData() })
    }, 1000)
  }

  render() {
    const { data, radius, hoveredNode, offset } = this.state

    return (
      <Container>
        <XYPlot
          sizeHexagonsWithCount
          width={500}
          getX={d => d.waiting}
          getY={d => d.eruptions}
          onMouseLeave={() => this.setState({ hoveredNode: null })}
          height={500}
        >
          <HexbinSeries
            animation={{ damping: 9, stiffness: 300 }}
            onValueMouseOver={d => this.setState({ hoveredNode: d })}
            radius={radius}
            data={data}
          />
        </XYPlot>
      </Container>
    )
  }
}

export { HexbinSizeExample }
