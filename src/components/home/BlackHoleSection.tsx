import React from "react"
import styled from "styled-components"
import { Content, Huge } from "../../ui"
import { BlackHole } from "../black-hole/BlackHole"

const Container = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 100px);
  width: 100%;

  ${Huge} {
    width: 100px;
  }

  canvas {
    height: 280px;
    width: 280px;
    flex-shrink: 0;
  }
`

interface BlackHomeSectionProps {}

const BlackHoleSection = ({}: BlackHomeSectionProps) => {
  return (
    <Content>
      <Container>
        <Huge>Cosmic dose of knowledge</Huge>
        <BlackHole id="hole" />
      </Container>
    </Content>
  )
}

export type { BlackHomeSectionProps }

export { BlackHoleSection }
