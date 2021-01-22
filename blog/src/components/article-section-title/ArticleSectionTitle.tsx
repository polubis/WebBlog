import styled, { css } from "styled-components"
import theme from "../../utils/theme"

interface Props {
  shifted?: boolean
}

export default styled.h2<Props>`
  color: ${theme.secondary};
  font-size: 24px;
  font-weight: bolder;
  margin: 0;

  ${({ shifted }) =>
    shifted &&
    css`
      display: flex;
      align-items: center;

      &::before {
        content: "";
        display: block;
        background: ${theme.secondary};
        opacity: 0.7;
        width: 24px;
        height: 2px;
        margin-right: 18px;
      }
    `}
`
