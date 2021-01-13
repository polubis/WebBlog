import React from "react"
import { Link as GatsbyLink } from "gatsby"

import styled from "styled-components"

import Logo from "../logo/Logo"
import Divider from "../divider/Divider"
import theme from "../../utils/theme"

const Link = styled(GatsbyLink)`
  font-size: 14px;
  font-weight: bolder;
  color: ${theme.secondary};
  text-decoration: none;
  text-transform: uppercase;

  &:not(:last-of-type) {
    margin-right: 62px;
  }
`

const Navbar = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 38px 0;
`

const LINKS = [
  "technologies",
  "authors",
  "articles",
  "about",
  "contact",
  "join us",
]

const renderLinks = (str, end = LINKS.length) => {
  return LINKS.slice(str, end).map(link => (
    <Link to={`/${link}`} key={link} activeStyle={{ color: theme.primary }}>
      {link}
    </Link>
  ))
}

export default function () {
  return (
    <Navbar>
      {renderLinks(0, 3)}

      <Divider m="0 62px 0 0" />

      <GatsbyLink to="/">
        <Logo />
      </GatsbyLink>

      <Divider m="0 62px" />

      {renderLinks(3)}
    </Navbar>
  )
}
