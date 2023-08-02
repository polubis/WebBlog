import React from "react"
import styled from "styled-components"
import { useLayoutProvider } from "../providers/LayoutProvider"
import { XL } from "../../ui"
import { LayoutT } from "../core/models"

const Container = styled.div`
  height: 100%;

  ${XL} {
    padding: 20px;
    text-align: center;
  }
`

export const CodePlaceholder = ({ label }: { label: keyof LayoutT }) => {
  const layout = useLayoutProvider()

  return (
    <Container className="center">
      <XL>{layout.t[label]}</XL>
    </Container>
  )
}
