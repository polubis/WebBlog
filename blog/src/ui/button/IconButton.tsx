import styled, { css } from "styled-components"
import theme from "../../utils/theme"

type Size = "small" | "medium"
type Variant =
  | "primary"
  | "secondary"
  | "primary-outlined"
  | "secondary-outlined"

export interface IconButtonProps {
  rounded?: boolean
  size?: Size
  variant?: Variant
}

const base = css`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: transparent;
  border: 1px solid transparent;
  font-family: inherit;

  &:disabled {
    cursor: not-allowed;
  }

  &:focus {
    outline: none;
  }
`

export const IconButton = styled.button<IconButtonProps>`
  ${base}

  ${props => {
    const byDefault = css`
      color: ${theme.black};
      background: ${theme.primary};
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
        font-size: 20px;
        font-size: bold;
      `
    }

    if (props.size === "medium") {
      return css`
        height: 48px;
        width: 48px;
        font-size: 20px;
        font-size: bold;
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
