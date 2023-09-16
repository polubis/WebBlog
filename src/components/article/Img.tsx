import React from "react"
import styled, { css } from "styled-components"

import { M, S } from "../../ui"
import theme from "../../utils/theme"

interface Props {
  src: string
  description?: React.ReactNode
  border?: boolean
}

const Img = styled.figure<{ border: Props["border"] }>`
  margin: 24px 0 0 0;

  & > img {
    max-width: 100%;
    max-height: 100%;
    
    ${props =>
      props.border &&
      css`
        border: 1px solid ${theme.primary};
        border-radius: 4px;
      `}
  }

  ${S} {
    display: block;
    margin-top: 12px;
  }

  & + ${M} {
    margin-top: 24px;
  }
`

export default function ({
  src,
  description,
  border,
}: Props): React.ReactElement {
  return (
    <Img className="ui-image" border={border}>
      <img src={src} loading="lazy" alt={description} />
      {description && <S italic>{description}</S>}
    </Img>
  )
}
