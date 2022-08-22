import React from "react"
import styled, { css } from "styled-components"

import { S } from "../../ui"
import theme from "../../utils/theme"

interface Props {
  src: string
  description: string
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
        border-radius: 2px;
      `}
  }

  ${S} {
    display: block;
    margin-top: 12px;
  }
`

export default function ({
  src,
  description,
  border,
}: Props): React.ReactElement {
  return (
    <Img border={border}>
      <img src={src} loading="lazy" alt={description} />
      <S italic>{description}</S>
    </Img>
  )
}
