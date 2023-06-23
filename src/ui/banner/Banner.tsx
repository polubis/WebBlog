import React, { ReactNode } from "react"
import styled, { css } from "styled-components"
import theme from "../../utils/theme"
import { S } from "../text"

type Variant = "info"

const Container = styled.div<{ variant?: Variant }>`
  padding: 8px 12px;
  border-radius: 4px;

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
  className?: string
}

export const Banner = ({ className = "", children, variant }: BannerProps) => {
  return (
    <Container
      className={`ui-banner${className ? " " + className : ""}`}
      variant={variant}
    >
      <S>{children}</S>
    </Container>
  )
}
