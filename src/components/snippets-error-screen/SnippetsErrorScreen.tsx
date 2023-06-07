import React, { ReactNode } from "react"
import styled from "styled-components"
import { FullscreenCenter, M, XL } from "../../ui"
import theme from "../../utils/theme"
import { List } from "../article/List"
import Section from "../article/Section"

const Errors = styled.div`
  display: flex;
  flex-flow: column;
  max-width: 620px;

  ${XL} {
    color: ${theme.error};
    margin-bottom: 12px;
  }
`

interface SnippetsErrorScreenProps {
  action: ReactNode
}

const SnippetsErrorScreen = ({ action }: SnippetsErrorScreenProps) => {
  return (
    <FullscreenCenter>
      <Errors>
        <Section>
          <XL>Errors detected 🔥</XL>
          <M>
            We cannot load snippet with given id :|. This could have happened
            for the following reasons:
          </M>
          <List items="Some crafty person may have removed the snippet,You provided the wrong ID,There was another random problem - maybe on the backend someone is playing with refactor" />
          {action}
        </Section>
      </Errors>
    </FullscreenCenter>
  )
}

export { SnippetsErrorScreen }
