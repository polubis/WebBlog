import React from "react"

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

interface Props {
  children: React.ReactNode
  banner?: React.ReactNode
}

export default function ({ children, banner }: Props): React.ReactElement {
  return (
    <Layout>
      {banner}
      <Navbar />
      <MobileNavigation />
      {children}
    </Layout>
  )
}
