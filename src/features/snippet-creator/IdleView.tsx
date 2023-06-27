import React, { ReactNode } from "react"

import { XL, M, B, CodeFrames } from "../../ui"
import Section from "../../components/article/Section"
import { List } from "../../components/article/List"
import { Fluid } from "./Fluid"
import { SHOWCASE_FRAMES } from "../../shared/show-case-frames"

interface IdleViewProps {
  footer: ReactNode
}

const IdleView = ({ footer }: IdleViewProps) => {
  return (
    <Fluid footer={footer}>
      <Section>
        <XL>Welcome to our tool for animating code snippets</XL>
        <M>
          Paste a few <B>code snippets</B> and then use{" "}
          <B>keyboard shortcuts</B> or <B>mouse</B> to show the result of your
          refactoring, explain complicated code or simply prepare something more
          than a static code snippet.
        </M>
        <M>Where and how you can use it?</M>
        <List items="In presentations, In Linkedin | Twitter | other social platforms posts, In your articles as gif, As video, As recorded gif, As sharable link" />
      </Section>
      <CodeFrames delay={2500} frames={SHOWCASE_FRAMES} />
    </Fluid>
  )
}

export { IdleView }
