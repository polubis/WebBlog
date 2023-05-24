import React, { ReactNode } from "react"
import styled from "styled-components"

const Footer = styled.footer`
  display: flex;
  align-items: center;
  padding: 16px 0 0 0;

  & > * {
    margin-bottom: 8px;

    :not(:last-child) {
      margin-right: 12px;
    }
  }
`

const SnippetCreatorFooter = ({ children }: { children: ReactNode }) => {
  return <Footer className="snippet-creator-footer">{children}</Footer>
}

export { SnippetCreatorFooter }
