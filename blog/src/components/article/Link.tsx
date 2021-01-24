import React from "react"
import styled from "styled-components"

import { M } from "./Text"
import theme from "../../utils/theme"

interface Props
  extends React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > {}

const Link = styled.a`
  cursor: pointer;
  text-decoration: underline;
  color: ${theme.primary};

  &:hover {
    opacity: 0.9;
  }
`

export default function ({ children, ...props }: Props): React.ReactElement {
  return (
    <Link {...(props as any)}>
      <M normal>{children}</M>
    </Link>
  )
}
