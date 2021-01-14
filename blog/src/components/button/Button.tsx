import React from "react"

import styled from "styled-components"

import theme from "../../utils/theme"

const Button = styled.button`
  text-transform: uppercase;
  background: none;
  border: none;
  color: ${theme.primary};
  font-size: 16px;
  font-weight: bolder;
  padding: 12px 18px;
  box-sizing: border-box;
  min-width: 72px;
  border-radius: 4px;
  cursor: pointer;
  font-family: inherit;

  &:focus {
    outline: none;
  }
`

interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {}

export default function (props: Props): React.ReactElement {
  return <Button {...(props as any)} />
}
