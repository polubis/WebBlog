import React from "react"
import styled from "styled-components"
import { B, CodeFrames, M, XL } from "../../ui"
import { SHOWCASE_FRAMES } from "../../shared/show-case-frames"
import Button from "../button/Button"
import { Link } from "gatsby"

const Container = styled.div`
  flex-flow: column;

  a,
  button {
    min-width: 240px;
  }

  a {
    margin-top: 32px;
  }

  ${M} {
    margin: 12px 0 32px 0;
    max-width: 620px;
    text-align: justify;
  }
`

export const SnippetCreatorSectionContent = () => {
  return (
    <Container className='center in'>
      <XL>Build fancy animated snippets</XL>
      <M>
        Use our tool and play with the <B>code refactoring</B>. You can present
        the results of your hard work to others by saving the created snippet
        and sharing the link.
      </M>
      <CodeFrames frames={SHOWCASE_FRAMES} />
      <Link to="/snippet-creator/">
        <Button>SHOW ME</Button>
      </Link>
    </Container>
  )
}
