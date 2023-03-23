import React, { ReactNode } from "react"
import styled from "styled-components"

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
