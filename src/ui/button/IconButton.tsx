import React, { DetailedHTMLProps, ButtonHTMLAttributes } from "react"
import styled, { css } from "styled-components"
import theme from "../../utils/theme"

type Size = "small" | "medium"
type Variant =
  | "primary"
  | "secondary"
  | "primary-outlined"
  | "secondary-outlined"

export interface IconButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  rounded?: boolean
  size?: Size
  variant?: Variant
}

const base = css<IconButtonProps>`
  display: flex;
  align-items: center;
  position: relative;
  justify-content: center;
  cursor: pointer;
  background: transparent;
  border: 1px solid transparent;

  &:disabled {
    cursor: not-allowed;
  }

  &:focus {
    outline: none;
  }

  ${props => {
    const byDefault = css`
      color: ${theme.black};
      background: ${theme.primary};

      &:hover {
        opacity: 0.9;
      }
    `

    if (props.variant === "primary") {
      return byDefault
    }

    if (props.variant === "primary-outlined") {
      return css`
        color: ${theme.primary};
        border-color: ${theme.primary};
      `
    }

    if (props.variant === "secondary") {
      return css``
    }

    if (props.variant === "secondary-outlined") {
      return css`
        color: ${theme.secondary};
        border-color: ${theme.secondary};
      `
    }

    return byDefault
  }}

  ${props => {
    if (!props.size || props.size === "small") {
      return css`
        height: 40px;
        width: 40px;
      `
    }

    if (props.size === "medium") {
      return css`
        height: 48px;
        width: 48px;
      `
    }
  }}

  ${props =>
    props.rounded
      ? css`
          border-radius: 50%;
        `
      : css`
          border-radius: 4px;
        `}
`

const Wrapper = styled.button<IconButtonProps>`
  ${base}
`

export const IconButton = ({
  size,
  variant,
  rounded,
  children,
  ...props
}: IconButtonProps) => {
  return (
    <Wrapper {...props} variant={variant} size={size} rounded={rounded}>
      <span>{children}</span>
    </Wrapper>
  )
}
