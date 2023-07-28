import React from "react"

import Section from "./Section"
import { XL } from "../../ui"

interface Props {
  children: React.ReactNode
  label?: string
}

export default function ({
  children,
  label = "Prelude",
}: Props): React.ReactElement {
  return (
    <Section>
      <XL shifted>{label}</XL>
      {children}
    </Section>
  )
}
