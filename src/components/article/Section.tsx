import React, { ReactNode } from "react"
import styled from "styled-components"

import { XL, M, Hint, S } from "../../ui"

const Section = styled.section`
  margin-bottom: 48px;

  ${XL} {
    margin-bottom: 32px;
  }

  ${M} {
    margin-bottom: 12px;
  }

  ${S} {
    margin-bottom: 12px;
  }

  ${Hint} {
    margin: 24px 0 0 0;
  }
`

export default ({
  children,
  containerType = "section",
}: {
  children: ReactNode
  containerType?: string
}) => <Section data-container-type={containerType}>{children}</Section>
