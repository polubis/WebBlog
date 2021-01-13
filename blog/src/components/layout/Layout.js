import React, { useLayoutEffect } from "react"
import { Link } from "gatsby"

import styled from "styled-components"

import theme from "../../utils/theme"
import Navbar from "../navbar/Navbar"

const Layout = styled.div`
  min-height: 100vh;
  background: ${theme.bg};
  display: flex;
  flex-flow: column;

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

export default function ({ children }) {
  useStylesReset()

  return (
    <Layout>
      <div>
        <Navbar />
        {children}
      </div>
    </Layout>
  )
}
