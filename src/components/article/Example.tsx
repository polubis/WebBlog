import React from "react"
import { XL } from "../../ui"
import { IframeProps, Iframe } from "./Iframe"

import Section from "./Section"

export const Example = ({ src, title }: IframeProps) => {
  return (
    <Section containerType="example">
      <XL>Full example</XL>
      <Iframe src={src} title={title} />
    </Section>
  )
}
