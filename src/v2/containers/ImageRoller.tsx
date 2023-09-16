import React from "react"
import styled from "styled-components"
import { useLayoutProvider } from "../providers/LayoutProvider"
import { M, XL } from "../../ui"
import { ImageRollerProps } from "./models"

const Container = styled.div`
  padding: 20px;
  background: rgba(0, 0, 0, 0.75);

  ${XL} {
    margin-bottom: 0;
  }

  ${M} {
    margin: 12px 0 28px 0;
    max-width: 600px;
  }
`

const ImageRoller = ({ onExpand }: ImageRollerProps) => {
  const layout = useLayoutProvider()

  return (
    <Container className="image-roller center col">
      <XL className="tcenter">{layout.t.image_placeholder.title}</XL>
      <M className="tcenter">{layout.t.image_placeholder.description}</M>
      <button className="roller-btn button upper primary" onClick={onExpand}>
        {layout.t.image_placeholder.btn_title}
      </button>
    </Container>
  )
}

export { ImageRoller }
