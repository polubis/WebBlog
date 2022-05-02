import React from "react"
import { Link as GatsbyLink } from "gatsby"
import styled from "styled-components"

import Logo from "../logo/Logo"
import Divider from "../divider/Divider"
import { L_DOWN } from "../../utils/viewport"
import Links from "./Links"

const Navbar = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 38px 0;
  box-sizing: border-box;
  z-index: 1;

  @media ${L_DOWN} {
    display: none;
  }

  & > a:not(:last-of-type) {
    margin-right: 62px;
  }

  ${Divider} {
    margin: 0 62px 0 0;
  }
`

export default function (): React.ReactElement {
  return (
    <Navbar>
      <Links items={[{ label: "articles", url: "/" }]} />

      <Divider />

      <GatsbyLink to="/">
        <Logo />
      </GatsbyLink>

      <Divider />

      <Links items={[{ label: "authors", url: "/authors" }]} />
    </Navbar>
  )
}
