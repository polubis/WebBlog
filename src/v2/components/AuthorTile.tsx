import styled from "styled-components"
import React from "react"
import { M, X, XL } from "../../ui"
import theme from "../../utils/theme"
import type { AuthorTileProps } from "./models"

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

const Footer = styled.div`
  margin-top: auto;
  padding: 32px 0 16px 0;

  & > *:not(:first-child) {
    margin-left: 24px;
  }

  a {
    cursor: pointer;

    &:hover {
      color: ${theme.primary};
    }
  }
`

const AuthorTile = ({
  avatar,
  fullName,
  footer,
  role,
  bio,
}: AuthorTileProps) => {
  return (
    <Container className="col">
      {avatar}
      <XL>{fullName}</XL>
      <X>{role}</X>
      <M>{bio}</M>
      <Footer className="center">{footer}</Footer>
    </Container>
  )
}

export { AuthorTile }
