import React, { ReactNode } from "react"
import styled from "styled-components"
import { SM_DOWN } from "../../utils/viewport"

const Container = styled.div`
  display: flex;
  justify-content: right;

  & > *:not(:first-child) {
    margin: 0 0 0 20px;
  }

  @media ${SM_DOWN} {
    flex-flow: column;

    & > *:not(:first-child) {
      margin: 20px 0 0 0;
    }

    & > * {
      max-width: 100%;
      width: 100%;
    }
  }
`

interface NavigationSectionProps {
  children: ReactNode
}

const NavigationSection = ({ children }: NavigationSectionProps) => {
  return <Container>{children}</Container>
}

export { NavigationSection }
