import React, { useLayoutEffect } from "react"

import styled from "styled-components"

import theme from "../../utils/theme"
import Navbar from "../navigation/Navbar"
import { T_UP, M_UP } from "../../utils/viewport"
import MobileNavigation from "../navigation/MobileNavigation"

const Layout = styled.div`
  min-height: 100vh;
  background: ${theme.bg};
  display: flex;
  flex-flow: column;
  padding: 0 28px;

  @media ${M_UP} {
    padding: 0 42px;
  }

  @media ${T_UP} {
    padding: 0 68px;
  }

  & > a:not(:last-of-type) {
    margin-right: 62px;
  }
`

const useStylesReset = () => {
  useLayoutEffect(() => {
    document.body.style.minHeight = "100vh"
    document.body.style.margin = "0"
    document.body.style.padding = "0"
    document.body.style.fontFamily = "Roboto"
  }, [])
}

interface Props {
  children: React.ReactNode
}

export default function ({ children }: Props): React.ReactElement {
  useStylesReset()

  return (
    <Layout>
      <Navbar />
      <MobileNavigation />
      {children}
    </Layout>
  )
}
