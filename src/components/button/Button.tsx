import React from "react"

import styled, { css } from "styled-components"

import theme from "../../utils/theme"

interface StyledButtonProps {
  active?: boolean
}

export const common = css`
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

const Button = styled.button.attrs((props: StyledButtonProps) => ({
  active: props.active,
}))`
  ${common}
  border: 1px solid ${theme.primary};
  color: ${theme.primary};

  ${props =>
    props.active &&
    css`
      background: ${theme.primary};
      color: ${theme.bg};
    `}

  &:hover:not(:disabled) {
    background: ${theme.primary};
    color: ${theme.bg};
  }
`

interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  active?: boolean
}

export default function (props: Props): React.ReactElement {
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

export const SecondaryTextButton = styled.button`
  ${common}
  border: 1px solid transparent;
  color: ${theme.white};

  &:hover:not(:disabled) {
    background: transparent;
    color: ${theme.white};
  }
`

export const LinkButton = styled.button`
  color: ${theme.primary};
  border: none;
  text-decoration: underline;
  background: none;
  font-size: 16px;
  line-height: 28px;
  cursor: pointer;
  padding: 0;

  &:hover {
    color: ${theme.primaryA};
  }
`
