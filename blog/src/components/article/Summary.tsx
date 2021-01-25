import React from "react"

import Section from "./Section"
import { XL } from "./Text"

interface Props {
  children: React.ReactNode
}

export default function ({ children }: Props): React.ReactElement {
  return (
    <Section>
      <XL shifted>Summary</XL>
      {children}
    </Section>
  )
}
