import React from "react"

import styled from "styled-components"
import { T_DOWN } from "../../../../utils/viewport"

const Layout = styled.div`
  & > a:not(:last-of-type) {
    margin-right: 62px;
  }

  @media ${T_DOWN} {
    height: 100%;
  }
`

interface Props {
  children: React.ReactNode
}

export default function ({ children }: Props): React.ReactElement {
  return <Layout className="col">{children}</Layout>
}
