import React, { ReactNode } from "react"
import styled from "styled-components"
import { FullscreenCenter, M, XL } from "../../ui"
import theme from "../../utils/theme"
import { List } from "../../components/article/List"
import Section from "../../components/article/Section"
import { Link } from "gatsby"
import Button from "../../components/button/Button"

const Errors = styled.div`
  display: flex;
  flex-flow: column;
  max-width: 620px;

  ${XL} {
    color: ${theme.error};
    margin-bottom: 12px;
  }

  .generate-snippet-link {
    display: block;
    margin-top: 40px;
  }
`

const SnippetsErrorScreen = ({ onClick }: { onClick?: () => void }) => {
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
          <Link className="generate-snippet-link" to="/snippet-creator/">
            <Button onClick={onClick} className="generate-snippet-link">
              GENERATE YOUR SNIPPET
            </Button>
          </Link>
        </Section>
      </Errors>
    </FullscreenCenter>
  )
}

export { SnippetsErrorScreen }
