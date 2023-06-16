import React from "react"
import styled, { keyframes } from "styled-components"
import { B, CodeFrames, M, XL } from "../../ui"
import { SHOWCASE_FRAMES } from "../../shared/show-case-frames"
import Button from "../button/Button"
import { Link } from "gatsby"
import { T_UP } from "../../utils/viewport"

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
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto;
  gap: 40px;
  align-items: center;
  min-height: 100vh;
  padding: 40px 20px;
  max-width: 1280px;
  margin: 0 auto;
  opacity: 0;
  animation: ${appearIn} 0.3s ease-in-out 0.4s forwards;

  .ui-snippet {
    max-width: calc(100vw - 40px);
  }

  @media ${T_UP} {
    grid-template-columns: 1fr 500px;
    grid-template-rows: 1fr;
    padding: 40px 20px;
  }

  .snippet-creator-section-content-p {
    margin: 22px 0 48px 0;
  }
`

export const SnippetCreatorSectionContent = () => {
  return (
    <Container>
      <div className="snippet-creator-section-content">
        <XL>Build awesome animated snippets</XL>
        <M className="snippet-creator-section-content-p">
          Use our tool and play with the <B>code refactoring</B>. You can
          present the results of your hard work to others by saving the created
          snippet and sharing the <B>link</B>.
        </M>
        <Link to="/snippet-creator/">
          <Button>TRY IT</Button>
        </Link>
      </div>
      <CodeFrames frames={SHOWCASE_FRAMES} />
    </Container>
  )
}
