import styled from "styled-components"
import theme from "../../utils/theme"

export default styled.a`
  font-size: 16px;
  color: ${theme.primary};
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`
