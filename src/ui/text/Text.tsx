import React, { ReactNode } from "react"
import styled, { css } from "styled-components"
import theme from "../../utils/theme"

interface Props {
  shifted?: boolean
  light?: boolean
  bold?: boolean
  normal?: boolean
  italic?: boolean
  primary?: boolean
  grayedOut?: boolean
  hasBg?: boolean
  fullBg?: boolean
}

enum Weight {
  LIGHT = "lighter",
  BOLD = "bold",
  NORMAL = "normal",
}

const getStyle = ({ italic }: Props): string => (italic ? "italic" : "normal")

const getColor = ({ primary }: Props): string =>
  primary ? theme.primary : theme.secondary

const getWeight = (
  { light, bold, normal }: Props,
  defaultWeight: Weight
): Weight => {
  if (light) {
    return Weight.LIGHT
  }

  if (bold) {
    return Weight.BOLD
  }

  if (normal) {
    return Weight.NORMAL
  }

  return defaultWeight
}

const style = css`
  margin: 0;
  color: ${getColor};
  font-style: ${getStyle};
  opacity: ${({ grayedOut }: Props) => (grayedOut ? 0.7 : 1)};

  ${({ hasBg, fullBg }: Props) =>
    hasBg &&
    css`
      position: relative;
      padding-left: 18px;

      ${fullBg &&
      css`
        padding-right: 18px;
      `}

      &::before {
        content: "";
        top: -8px;
        bottom: 0;
        left: 0;
        height: calc(100% + 16px);
        width: ${fullBg ? "100%" : "10%"};
        opacity: 0.2;
        background: ${theme.secondary};
        position: absolute;
      }
    `};

  ${({ shifted }: Props) =>
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
    `};
`

export const Huge = styled.h1<Props>`
  font-size: 62px;
  ${style}
`

const XXL = styled.h1<Props>`
  font-size: 32px;
  word-break: break-word;
  font-weight: ${(props: Props) => getWeight(props, Weight.BOLD)};
  ${style}
`

export const XL = styled.h2<Props>`
  font-size: 26px;
  line-height: 32px;
  word-break: break-word;
  font-weight: ${(props: Props) => getWeight(props, Weight.BOLD)};
  ${style}
`

export const X = styled.h3<Props>`
  font-size: 18px;
  font-weight: ${(props: Props) => getWeight(props, Weight.BOLD)};
  ${style}
`

export const M = styled.p<Props>`
  font-size: 16px;
  line-height: 28px;
  margin: 0;
  font-weight: ${(props: Props) => getWeight(props, Weight.NORMAL)};
  ${style}
`

export const S = styled.p<Props>`
  font-size: 14px;
  line-height: 24px;
  margin: 0;
  font-weight: ${(props: Props) => getWeight(props, Weight.NORMAL)};
  ${style}
`

export const Hint = styled.p<Props>`
  font-size: 16px;
  line-height: 28px;
  font-weight: ${(props: Props) => getWeight(props, Weight.LIGHT)};
  ${style}
  font-style: italic;

  b {
    font-style: italic;
  }
`

export const Label = styled.span<Props>`
  font-size: 16px;
  font-weight: ${(props: Props) => getWeight(props, Weight.BOLD)};
  ${style}
`

const AComponent = styled.a`
  font-size: 16px;
  font-weight: ${(props: Props) => getWeight(props, Weight.NORMAL)};
  color: ${theme.primary};
  word-break: break-word;

  &:hover {
    opacity: 0.9;
  }
`

export const A = ({
  href,
  className,
  outside,
  children,
  title,
}: {
  href: string
  outside?: boolean
  children: ReactNode
  className?: string
  title?: string
}) => {
  return (
    <AComponent
      title={title}
      className={className}
      href={href}
      target={outside ? "_blank" : ""}
    >
      {children}
    </AComponent>
  )
}

export const B = styled.b<Props>`
  font-size: 16px;
  font-weight: ${(props: Props) => getWeight(props, Weight.BOLD)};
  ${style}
  color: ${theme.primary};
`

export { XXL }
