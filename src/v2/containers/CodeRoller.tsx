import React from "react"
import styled from "styled-components"
import type { RollerProps } from "../ui/code/models"
import { XL, M } from "../../ui"
import { useLayoutProvider } from "../providers/LayoutProvider"

const Container = styled.div`
  .code-roller-content {
    padding: 20px;

    ${XL} {
      margin-bottom: 0;
    }

    ${M} {
      margin: 12px 0 28px 0;
      max-width: 600px;
    } 
  }
`

export const CodeRoller = ({ style, onExpand }: RollerProps) => {
  const layout = useLayoutProvider()

  return (
    <Container style={style} className="ui-snippet center r1">
      <div className="code-roller-content col center">
        <XL className="tcenter tshadow1">{layout.t.roller.title}</XL>
        <M className="tcenter tshadow1">{layout.t.roller.description}</M>
        <button className="roller-btn button upper primary" onClick={onExpand}>
          {layout.t.roller.btn_title}
        </button>
      </div>
    </Container>
  )
}
