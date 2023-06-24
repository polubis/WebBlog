import React from "react"
import Section from "../article/Section"
import { A, B, Hint, M, XL } from "../../ui"
import { List } from "../article/List"
import theme from "../../utils/theme"
import styled from "styled-components"

const Errors = styled.div`
  display: flex;
  flex-flow: column;

  ${XL} {
    color: ${theme.error};
    margin-bottom: 12px;
  }
`

const ErrorsSection = () => {
  return (
    <Errors>
      <Section>
        <XL>Errors detected 🔥</XL>
        <M>
          This may have been caused by using an <B>unsupported tag</B>, using an{" "}
          <B>iframe</B>, or failing to <B>close</B> the tag.
        </M>
        <M>
          Here is the list of <B>supported tags</B>:
        </M>
        <List
          items="Section - block with content, Snippet - example with code, Summary - block with summary, Prelude - Block with an introduction, Example - Block with a link to the entire example, List - Allows you to display an list, Img - Allows you to show a picture, XL - Headline text, M - Paragraph, Hint - Italic text with hint,
            A - link, B - bolding"
        />
        <Hint hasBg>
          If you still have problems please join our community on{" "}
          <A
            outside
            href="https://discord.com/channels/1090959521364586568/1100664861073088572"
          >
            Discord
          </A>{" "}
          and ask for help.
        </Hint>
        <Hint hasBg>
          Are you missing an feature? Let us know on our dedicated{" "}
          <A
            outside
            href="https://discord.com/channels/1090959521364586568/1100664181847498842"
          >
            Discord
          </A>
          !
        </Hint>
      </Section>
    </Errors>
  )
}

export { ErrorsSection }
