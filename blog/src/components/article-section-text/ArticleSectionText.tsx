import styled from "styled-components"
import theme from "../../utils/theme"

interface Props {}

export default styled.div<Props>`
  font-size: 16px;
  color: ${theme.secondary};
  line-height: 25px;
  margin-top: 32px;
`
