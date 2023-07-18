import React from "react"
import styled from "styled-components"
import { M, X, XL } from "../../ui"
import { PersonAddIcon } from "../../ui/icons/PersonAddIcon"
import theme from "../../utils/theme"
import Button from "../button/Button"

const Avatar = styled.div`
  height: 92px;
  width: 92px;
  background: ${theme.secondary};

  svg {
    height: 42px;
    width: 42px;
  }

  path {
    fill: ${theme.black};
  }
`

const Container = styled.div`
  position: relative;
  align-items: center;
  padding: 26px 22px;
  border-radius: 4px;
  border: 1px solid ${theme.primary};

  ${XL}, ${X} {
    text-align: center;
  }

  & > *:nth-child(2) {
    margin: 24px 0 12px 0;
  }

  & > *:nth-child(4) {
    text-align: justify;
    display: block;
    margin: 18px 0 0 0;
  }
`

const Media = styled.div`
  margin-top: auto;
  padding: 32px 0 16px 0;
`

export const EmptyAuthorTile = () => {
  return (
    <Container className="col">
      <Avatar className="center circle">
        <PersonAddIcon />
      </Avatar>
      <XL>You can be here</XL>
      <X>Articles creator</X>
      <M>
        You can be one of the authors and create articles together with us. You
        will receive substantive technical support and help in English. Learn
        with us and teach others. Interested? Click the button below and contact
        us.
      </M>
      <Media className="center">
        <a
          href="https://discord.gg/PxXQayT3x3"
          title="Discord members"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button>JOIN US !</Button>
        </a>
      </Media>
    </Container>
  )
}
