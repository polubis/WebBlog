import React from "react"
import styled from "styled-components"
import theme from "../../utils/theme"
import { common } from "../button/Button"

const Select = styled.select`
  ${common}
  border: 1px solid ${theme.primary};
  color: ${theme.primary};
  padding: 10px 8px;
  position: relative;

  &:hover:not(:disabled) {
    background: ${theme.primary};
    color: ${theme.bg};
  }

  & option {
    background: ${theme.bg};
    color: ${theme.primary};
    margin: 0;
    &:hover {
      background-color: ${theme.primary};
      color: ${theme.bg};
    }
  }
`

interface Props
  extends React.DetailedHTMLProps<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {}

export default function (props: Props): React.ReactElement {
  return <Select {...(props as any)} />
}
