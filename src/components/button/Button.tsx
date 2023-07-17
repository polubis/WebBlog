import React from "react"

import styled, { css } from "styled-components"

import theme from "../../utils/theme"

const common = css`
  text-transform: uppercase;
  background: none;
  font-size: 14px;
  font-weight: bolder;
  padding: 10px 18px;
  box-sizing: border-box;
  min-width: 72px;
  border-radius: 4px;
  cursor: pointer;
  font-family: inherit;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.4;
  }

  &:focus {
    outline: none;
  }
`

const Button = styled.button`
  ${common}
  border: 1px solid ${theme.primary};
  color: ${theme.primary};

  &:hover:not(:disabled) {
    background: ${theme.primary};
    color: ${theme.bg};
  }
`

interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > { }

export default function (props: Props) {
  return <Button {...(props as any)} />
}

export const SecondaryButton = styled.button`
  ${common}
  border: 1px solid ${theme.white};
  color: ${theme.white};

  &:hover:not(:disabled) {
    background: transparent;
    color: ${theme.white};
  }
`