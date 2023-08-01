import React, { ReactNode } from "react"

import { XL, M, B, CodeFrames } from "../../../../ui"
import Section from "../../../../components/article/Section"
import { SHOWCASE_FRAMES } from "../../../../shared/show-case-frames"
import { Fluid } from "../components/Fluid"
import { useSnippetCreatorPageProvider } from "../SnippetCreatorPageProvider"
import { L, Li } from "../../../../components/article/L"

interface IdleViewProps {
  footer: ReactNode
}

const IdleView = ({ footer }: IdleViewProps) => {
  const creator = useSnippetCreatorPageProvider()

  return (
    <Fluid footer={footer}>
      <Section>
        <XL>{creator.t.page.sentence}</XL>
        <M>
          {creator.t.page.explanation.paste_a_few}{" "}
          <B>{creator.t.page.explanation.code_snippets}</B>{" "}
          {creator.t.page.explanation.and_then_use}{" "}
          <B>{creator.t.page.explanation.keyboard_shortcuts}</B>{" "}
          {creator.t.page.explanation.or}{" "}
          <B>{creator.t.page.explanation.mouse}</B>{" "}
          {creator.t.page.explanation.to_show}
        </M>
        <M>{creator.t.page.where_and_how}</M>
        <L>
          {creator.t.page.explanation.where_to_use_list.map(item => (
            <Li key={item}>{item}</Li>
          ))}
        </L>
      </Section>
      <CodeFrames delay={2500} frames={SHOWCASE_FRAMES} />
    </Fluid>
  )
}

export { IdleView }
