import React from "react"
import styled from "styled-components"
import theme from "../../../../utils/theme"
import Section from "../../../../components/article/Section"
import { A, Hint, M, XL } from "../../../../ui"
import { useBlogCreatorPageProvider } from "../BlogCreatorPageProvider"
import { L, Li } from "../../../../components/article/L"
import { useLayoutProvider } from "../../../providers/LayoutProvider"

const Errors = styled.div`
  ${XL} {
    color: ${theme.error};
    margin-bottom: 12px;
  }
`

const ErrorsSection = () => {
  const creator = useBlogCreatorPageProvider()
  const layout = useLayoutProvider()

  return (
    <Errors className="col">
      <Section>
        <XL>{creator.t.errors_heading} 🔥</XL>
        <M>{creator.t.errors_description}</M>
        <M>{creator.t.errors_here_is_a_list}</M>
        <L>
          <Li>Prelude, Section, Example, Summary, Demo</Li>
          <Li>L, Li</Li>
          <Li>Code</Li>
          <Li>Img</Li>
          <Li>Hint, M, XL, A, B</Li>
        </L>
        <Hint hasBg>
          {creator.t.still_problems}{" "}
          <A outside href={layout.discord_url}>
            {layout.t.discord_channel}
          </A>
          .
        </Hint>
      </Section>
    </Errors>
  )
}

export { ErrorsSection }
