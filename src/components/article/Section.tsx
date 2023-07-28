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

  .l {
    padding-left: 16px;

    & + .l,
    & + .ui-image,
    & + .ui-snippet {
      margin-top: 24px;
    }

    & + ${Hint} {
      margin-top: 32px;
    }

    & + ${M} {
      margin-top: 12px;
    }
  }

  .ui-snippet {
    & + ${M}, & + .l,
    & + .ui-snippet,
    & + .ui-image {
      margin-top: 24px;
    }
  }

  .ui-image {
    & + ${M}, & + .ui-snippet,
    & + .ui-image,
    & + .l {
      margin-top: 24px;
    }
  }
`

export default ({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) => <Section className={className}>{children}</Section>
