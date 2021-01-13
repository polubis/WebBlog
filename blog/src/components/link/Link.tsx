import React from "react"
import { Link as GatsbyLink, GatsbyLinkProps } from "gatsby"

import styled from "styled-components"

import theme from "../../utils/theme"

const Link = styled(GatsbyLink)`
  font-size: 14px;
  font-weight: bolder;
  color: ${theme.secondary};
  text-decoration: none;
  text-transform: uppercase;
`

export default function (props: GatsbyLinkProps<unknown>): React.ReactElement {
  return <Link {...(props as any)} />
}
