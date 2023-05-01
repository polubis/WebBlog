import React, { ReactNode } from "react"
import styled from "styled-components"

import { XL, M, Hint } from "../../ui"

const Section = styled.section`
  margin-bottom: 48px;

  ${XL} {
    margin-bottom: 32px;
  }

  ${M} {
    margin-bottom: 12px;
  }

  ${M} + ${Hint} {
    margin-bottom: 20px;
  }

  ${Hint} + ${Hint} {
    margin-bottom: 20px;
  }

  ${Hint} {
    margin: 24px 0 0 0;
  }

  ${Hint} + ${M} {
    margin-top: 20px;
  }

  .ui-snippet {
    & + ${M} {
      margin-top: 24px;
    }

    & + .ui-snippet {
      margin-top: 24px;
    }

    & + .ui-image {
      margin-top: 24px;
    }
  }

  .ui-image {
    & + ${M} {
      margin-top: 24px;
    }

    & + .ui-snippet {
      margin-top: 24px;
    }

    & + .ui-image {
      margin-top: 24px;
    }
  }
`

export default ({
  children,
  containerType = "section",
}: {
  children: ReactNode
  containerType?: string
}) => <Section data-container-type={containerType}>{children}</Section>
