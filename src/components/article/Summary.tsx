import React from "react"

import Section from "./Section"
import { XL } from "../../ui"

interface Props {
  children: React.ReactNode
  label?: string
}

export default function ({
  children,
  label = "Summary",
}: Props): React.ReactElement {
  return (
    <Section containerType="summary">
      <XL shifted>{label}</XL>
      {children}
    </Section>
  )
}
