import styled from "styled-components"

import { XL } from "./Text"
import Code from "./Code"

export default styled.section`
  margin-bottom: 48px;

  ${XL} {
    margin-bottom: 32px;
  }

  ${Code} {
    margin-top: 24px;
  }
`
