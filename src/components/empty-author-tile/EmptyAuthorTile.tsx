import React from "react"
import styled from "styled-components"
import { M, X, XL } from "../../ui"
import { PersonAddIcon } from "../../ui/icons/PersonAddIcon"
import theme from "../../utils/theme"
import Button from "../button/Button"

const Avatar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 92px;
  width: 92px;
  border-radius: 50%;
  background: ${theme.secondary};

  path {
    fill: ${theme.black};
  }
`

const Container = styled.div`
  position: relative;
  display: flex;
  flex-flow: column;
  align-items: center;
  padding: 26px 22px;
  border-radius: 2px;
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
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: auto;
  padding: 32px 0 16px 0;
`

export interface EmptyAuthorTileProps {
  onClick: () => void
}

export const EmptyAuthorTile = ({ onClick }: EmptyAuthorTileProps) => {
  return (
    <Container>
      <Avatar>
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
      <Media>
        <Button onClick={onClick}>JOIN US !</Button>
      </Media>
    </Container>
  )
}
