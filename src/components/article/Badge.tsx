import styled, { css } from "styled-components"

interface Props {
  color: string
}

export default styled.div<Props>`
  padding: 5px 6px;
  font-size: 12px;
  border-radius: 2px;
  width: max-content;
  text-transform: uppercase;

  ${({ color }) => css`
    color: ${color};
    border: 1px solid ${color};
  `}
`
