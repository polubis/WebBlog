import styled, { css } from "styled-components"

import theme from "../../utils/theme"

interface Props {
  horizontal?: boolean
}

export default styled.div<Props>`
  background: ${theme.primary};

  ${props =>
    props.horizontal
      ? css`
          width: 28px;
          height: 1px;
        `
      : css`
          height: 28px;
          width: 1px;
        `}
`
