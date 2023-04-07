import React, { ReactNode } from "react"
import { XL } from "../../ui"

import Section from "./Section"

export const Example = ({ children }: { children: ReactNode }) => {
  return (
    <Section containerType="example">
      <XL>Full example</XL>
      {children}
    </Section>
  )
}
