import React from "react"
import styled from "styled-components"
import type { RollerProps } from "../ui/code/models"
import { XL, M } from "../../ui"
import { useLayoutProvider } from "../providers/LayoutProvider"

const Container = styled.div`
  position: relative;
  
  .ui-snippet {
    pre {
      overflow: hidden;
    }
  }

  .roller-backdrop {
    position: absolute;
    flex-flow: column;
    padding: 20px;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.75);
    height: 100%;
    width: 100%;

    ${XL} {
      margin-bottom: 0;
    }

    ${M} {
      margin: 12px 0 28px 0;
      max-width: 600px;
    }
  }
`

export const CodeRoller = ({ children, onExpand }: RollerProps) => {
  const layout = useLayoutProvider()

  return (
    <Container className='ui-snippet'>
      {children}
      <div className="roller-backdrop center r1">
        <XL className="tcenter tshadow1">{layout.t.roller.title}</XL>
        <M className="tcenter tshadow1">{layout.t.roller.description}</M>
        <button className="roller-btn button upper primary" onClick={onExpand}>
          {layout.t.roller.btn_title}
        </button>
      </div>
    </Container>
  )
}
