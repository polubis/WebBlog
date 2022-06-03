import React from "react"

import styled from "styled-components"

import theme from "../../utils/theme"

const Layout = styled.div`
  height: 100vh;
  background: ${theme.bg};
  display: flex;
  flex-flow: column;
  padding: 0 28px;

  & > a:not(:last-of-type) {
    margin-right: 62px;
  }
`

interface Props {
  children: React.ReactNode
}

export default function ({ children }: Props): React.ReactElement {
  return <Layout>{children}</Layout>
}
