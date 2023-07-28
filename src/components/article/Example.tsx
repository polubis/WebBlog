import React, { ReactNode } from "react"
import { XL } from "../../ui"

import Section from "./Section"

export const Example = ({
  children,
  label = "Full example",
}: {
  children: ReactNode
  label?: string
}) => {
  return (
    <Section>
      <XL>{label}</XL>
      {children}
    </Section>
  )
}
