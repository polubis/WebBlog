import React from "react"
import styled from "styled-components"
import type { RollerProps } from "./models"
import { M, XL } from "../../../ui"

const Container = styled.div`
  position: relative;

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

export const Roller = ({ children, onExpand }: RollerProps) => {
  return (
    <Container>
      {children}
      <div className="roller-backdrop center r1">
        <XL className="tcenter tshadow1">This snippet is kinda big 🙀</XL>
        <M className="tcenter tshadow1">
          We are hiding too big snippets to reduce the time to load of our page.
          If you want to see it, just click the button below.
        </M>
        <button className="roller-btn button upper primary" onClick={onExpand}>
          Show me
        </button>
      </div>
    </Container>
  )
}
