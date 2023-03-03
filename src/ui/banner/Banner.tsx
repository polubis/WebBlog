import React, { ReactNode } from "react"
import styled, { css } from "styled-components"
import theme from "../../utils/theme"
import { S } from "../text"

type Variant = "info"

const Container = styled.div<{ variant?: Variant }>`
  padding: 8px 12px;
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;

  ${props => {
    const defaultStyle = css`
      background: ${theme.bannerInfoBg};

      ${S} {
        color: ${theme.bannerInfoText};
      }
    `

    if (props.variant === "info") {
      return defaultStyle
    }

    return defaultStyle
  }}
`

export interface BannerProps {
  children: ReactNode
  variant?: Variant
}

export const Banner = ({ children, variant }: BannerProps) => {
  return (
    <Container variant={variant}>
      <S>{children}</S>
    </Container>
  )
}
