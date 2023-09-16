import React from "react"
import styled from "styled-components"
import { useLayoutProvider } from "../providers/LayoutProvider"
import { M, XL } from "../../ui"
import { ImageRollerProps } from "../ui/image/models"

const Container = styled.div`
  padding: 20px;

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
      <XL className="tcenter tshadow1">{layout.t.image_placeholder.title}</XL>
      <M className="tcenter tshadow1">
        {layout.t.image_placeholder.description}
      </M>
      <button className="roller-btn button upper primary" onClick={onExpand}>
        {layout.t.image_placeholder.btn_title}
      </button>
    </Container>
  )
}

export { ImageRoller }
