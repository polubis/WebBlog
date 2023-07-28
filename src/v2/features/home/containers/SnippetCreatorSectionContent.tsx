import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import { CodeFrames, M, XL } from "../../../../ui"
import { useHomePageProvider } from "../HomePageProvider"
import { useLayoutProvider } from "../../../providers/LayoutProvider"

const Container = styled.div`
  flex-flow: column;

  a,
  button {
    min-width: 240px;
  }

  a {
    margin-top: 32px;
  }


  .ui-snippet {
    max-width: 100%;
  }

  ${M} {
    margin: 12px 0 32px 0;
    max-width: 620px;
    text-align: center;
  }

  ${XL} {
    text-align: center;
  }
`

export const SnippetCreatorSectionContent = () => {
  const home = useHomePageProvider()
  const layout = useLayoutProvider()

  return (
    <Container className="center in">
      <XL>{home.t.snippet_creator_heading}</XL>
      <M>{home.t.snippet_creator_description}</M>
      <CodeFrames frames={home.showcase_frames} />
      <Link className="button primary upper" to={layout.routes.creator.to}>
        {home.t.show_me}
      </Link>
    </Container>
  )
}
