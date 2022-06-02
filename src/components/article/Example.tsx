import React from "react"

import Section from "./Section"

interface Props {
  children: React.ReactNode
}

export default function ({ children }: Props): React.ReactElement {
  return <Section containerType="example">{children}</Section>
}
