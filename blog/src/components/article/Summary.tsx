import React from "react"

import Section from "./Section"
import { XL } from "../../ui"

interface Props {
  children: React.ReactNode
}

export default function ({ children }: Props): React.ReactElement {
  return (
    <Section containerType="summary">
      <XL shifted>Summary</XL>
      {children}
    </Section>
  )
}
