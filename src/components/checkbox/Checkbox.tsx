import React from "react"
import styled from "styled-components"
import theme from "../../utils/theme"

const Container = styled.button`
  text-transform: uppercase;
  background: none;
  font-size: 14px;
  font-weight: bolder;
  padding: 10px 18px;
  box-sizing: border-box;
  border-radius: 4px;
  cursor: pointer;
  font-family: inherit;

  &:focus {
    outline: none;
  }

  border: 1px solid ${theme.primary};
  color: ${theme.primary};

  &:hover {
    opacity: 0.9;
  }

  &.active {
    border: 1px solid ${theme.primary};
    background: ${theme.primary};
    color: black;
  }
`

interface CheckboxProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  active?: boolean
}

const Checkbox = ({ className, active, ...props }: CheckboxProps) => {
  return (
    <Container
      type="button"
      className={`checkbox ${className ? " " + className : ""}${
        active ? " " + "active" : ""
      }`}
      {...(props as any)}
    />
  )
}

export { Checkbox, CheckboxProps }
