import React from "react"
import styled from "styled-components"
import { M, XXL } from "../../ui"
import Button from "../button/Button"
import { Link } from "gatsby"
import { ManGraphic } from "./ManGraphic"
import { Shape } from "./Shape"
import { L_DOWN, T_DOWN, M_DOWN } from "../../utils/viewport"

const Container = styled.section`
  padding: 76px 32px;
  position: relative;
  background: #151515;

  @media ${L_DOWN} {
    overflow: hidden;
  }

  @media ${T_DOWN} {
    padding: 32px 32px;
  }

  & > svg {
    position: absolute;
    left: -260px;
    bottom: -280px;

    @media ${L_DOWN} {
      transform: scale(3);
    }
  }
`

const TextContent = styled.div`
  display: flex;
  flex-flow: column;
  max-width: 400px;
  z-index: 1;

  & > *:nth-child(2) {
    margin: 22px 0 48px 0;
  }

  & > button {
    margin-right: auto;
  }
`

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1000px;
  margin: 0 auto;

  svg {
    flex-shrink: 0;
  }

  @media ${L_DOWN} {
    max-width: 900px;

    ${TextContent} {
      margin-right: 48px;
      max-width: 100%;
    }

    & > *:nth-child(2) {
      @media ${T_DOWN} {
        display: none;
      }
    }
  }

  @media ${M_DOWN} {
    ${TextContent} {
      margin-right: 0;
    }
  }
`

export const WelcomeSection = () => {
  return (
    <Container>
      <Content>
        <TextContent>
          <XXL>Boost your programming skills</XXL>
          <M>
            A place for people who love programming and personal development.
          </M>
          <Link to="/articles/">
            <Button>CHECK BLOG</Button>
          </Link>
        </TextContent>
        <ManGraphic />
      </Content>
      <Shape />
    </Container>
  )
}
