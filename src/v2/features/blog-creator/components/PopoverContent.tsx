import React, { ReactNode } from "react"
import styled from "styled-components"
import { PopoverContentProps } from "./models"

const Container = styled.div`
  .popover-content-wrapper {
    margin: 20px 0 0 0;

    & > *:not(:last-child) {
      margin-bottom: 12px;
    }
  }

  .popover-content-footer {
    justify-content: flex-end;

    & > * {
      margin-left: 12px;
    }
  }
`

const PopoverContent = ({ children }: PopoverContentProps) => {
    let Content: ReactNode
    let Footer: ReactNode | undefined

    if (Array.isArray(children)) {
        Content = children[0]
        Footer = children[1]
    } else {
        Content = children
    }

    return (
        <Container className="col">
            <div className="popover-content-wrapper">{Content}</div>
            {Footer && <div className="popover-content-footer row">{Footer}</div>}
        </Container>
    )
}

export { PopoverContent }
