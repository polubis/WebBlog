import React, { ReactNode } from "react"
import styled from "styled-components"
import { L_UP } from "../../utils/viewport"

interface ContentProps {
  children: ReactNode
  paddingY?: boolean
}

const Container = styled.div<Pick<ContentProps, "paddingY">>`
  width: 100%;
  height: 100%;
  max-width: 1280px;
  padding: ${props => (props.paddingY ? "64px 20px" : "0 20px")};
  margin: 0 auto;

  .ui-snippet {
    max-width: calc(100vw - 40px);

    @media ${L_UP} {
      max-width: 1280px;
    }
  }
`

const Content = ({ children, paddingY }: ContentProps) => {
  return (
    <Container className="ui-layout-content" paddingY={paddingY}>
      {children}
    </Container>
  )
}

export type { ContentProps }

export { Content }
