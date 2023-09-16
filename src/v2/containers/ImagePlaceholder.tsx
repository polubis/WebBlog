import React from "react"
import styled from "styled-components"
import { useLayoutProvider } from "../providers/LayoutProvider"
import { XL } from "../../ui"
import type { LayoutT } from "../core/models"

const Container = styled.div`
  padding: 20px;

  ${XL} {
    text-align: center;
  }
`

const ImagePlaceholder = ({ label }: { label: keyof LayoutT }) => {
  const layout = useLayoutProvider()

  return (
    <Container className="center">
      <XL>{layout.t[label]}</XL>
    </Container>
  )
}

export { ImagePlaceholder }
