import React from "react"
import styled from "styled-components"
import theme from "../../utils/theme"

import { M } from "../../ui"

interface Props
  extends React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > {}

const Link = styled.a`
  cursor: pointer;
  text-decoration: underline;
  color: ${theme.primary};

  & > * {
    color: ${theme.primary};
  }

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
