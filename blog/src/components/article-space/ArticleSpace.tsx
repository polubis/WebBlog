import styled from "styled-components"

interface Props {
  distance?: number
}

export default styled.div<Props>`
  margin: ${(props: Props) => `0 0 ${props.distance || "32px"} 0`};
`
