import React from "react"
import styled, { keyframes } from "styled-components"
import { B, CodeFrames, M, XL } from "../../ui"
import { SHOWCASE_FRAMES } from "../../shared/show-case-frames"
import Button from "../button/Button"
import { Link } from "gatsby"

const appearIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-15px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const Container = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  opacity: 0;
  animation: ${appearIn} 0.3s ease-in-out forwards;

  a,
  button {
    min-width: 280px;
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
    <Container>
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
