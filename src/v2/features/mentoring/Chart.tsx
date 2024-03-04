import React from "react"
import DATA from "./data.json"
import "react-vis/dist/style.css"
import { XYPlot, HexbinSeries } from "react-vis"
import styled from "styled-components"
import { useScroll } from "../../../utils/useScroll"

const updateData = (): typeof DATA => {
  return DATA.map(row => ({
    waiting: row.waiting + (Math.random() - 0.5) * 10,
    eruptions: row.eruptions + (Math.random() - 0.5) * 2,
  }))
}

const Container = styled.div`
  position: fixed;
  top: 120px;
  right: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const animation = { damping: 9, stiffness: 300 }

const Chart = () => {
  const [state, setState] = React.useState({
    data: DATA,
  })
  const { data } = state

  const scroll = useScroll({ strategy: "throttle", delay: 500 })

  React.useEffect(() => {
    setState({ data: updateData() })
  }, [scroll.offsetY])

  return (
    <Container>
      <XYPlot
        sizeHexagonsWithCount
        width={2000}
        getX={d => d.waiting}
        getY={d => d.eruptions}
        height={1000}
      >
        <HexbinSeries animation={animation} radius={10} data={data} />
      </XYPlot>
    </Container>
  )
}

export { Chart }
