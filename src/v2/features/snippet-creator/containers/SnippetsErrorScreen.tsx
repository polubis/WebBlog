import React from "react"
import styled from "styled-components"
import { FullscreenCenter, M, XL } from "../../../../ui"
import theme from "../../../../utils/theme"
import Section from "../../../../components/article/Section"
import { Link } from "gatsby"
import type { SnippetsErrorsScreenProps } from "./models"
import { useSnippetCreatorPageProvider } from "../SnippetCreatorPageProvider"
import { L, Li } from "../../../../components/article/L"
import { useLayoutProvider } from "../../../providers/LayoutProvider"

const Errors = styled.div`
  max-width: 620px;

  ${XL} {
    color: ${theme.error};
    margin-bottom: 12px;
  }

  .generate-snippet-link {
    display: block;
    margin-top: 40px;
    text-decoration: none;
  }
`

const SnippetsErrorScreen = ({ onClick }: SnippetsErrorsScreenProps) => {
  const creator = useSnippetCreatorPageProvider()
  const layout = useLayoutProvider()

  return (
    <FullscreenCenter>
      <Errors className="col">
        <Section>
          <XL>{creator.t.sandbox.not_found_error.title} 🔥</XL>
          <M>{creator.t.sandbox.not_found_error.message}</M>
          <L>
            {creator.t.sandbox.not_found_error.reasons.map(reason => (
              <Li key={reason}>{reason}</Li>
            ))}
          </L>
          <Link
            className="generate-snippet-link button primary upper"
            to={layout.routes.snippet_creator.to}
            onClick={onClick}
          >
            {creator.t.sandbox.not_found_error.action.generate}
          </Link>
        </Section>
      </Errors>
    </FullscreenCenter>
  )
}

export { SnippetsErrorScreen }
