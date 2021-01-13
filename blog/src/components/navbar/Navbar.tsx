import React from "react"
import { Link as GatsbyLink } from "gatsby"

import styled from "styled-components"

import Logo from "../logo/Logo"
import Divider from "../divider/Divider"
import Link from "../link/Link"

import theme from "../../utils/theme"

const Navbar = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 38px 0;

  & > a:not(:last-of-type) {
    margin-right: 62px;
  }
`

const LINKS = [
  "technologies",
  "authors",
  "articles",
  "about",
  "contact",
  "join us",
]

const renderLinks = (str, end = LINKS.length): React.ReactElement[] => {
  return LINKS.slice(str, end).map((link, i) => (
    <Link to={`/${link}`} key={link} activeStyle={{ color: theme.primary }}>
      {link}
    </Link>
  ))
}

export default function (): React.ReactElement {
  return (
    <Navbar>
      {renderLinks(0, 3)}

      <Divider margin="0 62px 0 0" />

      <GatsbyLink to="/">
        <Logo />
      </GatsbyLink>

      <Divider margin="0 62px 0 0" />

      {renderLinks(3)}
    </Navbar>
  )
}
