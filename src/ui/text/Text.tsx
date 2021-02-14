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

  ${({ hasBg }: Props) =>
    hasBg &&
    css`
      position: relative;
      padding-left: 18px;

      &::after {
        content: "";
        top: -8px;
        bottom: 0;
        left: 0;
        height: calc(100% + 16px);
        width: 44px;
        opacity: 0.2;
        background: ${theme.secondary};
        position: absolute;
      }
    `}

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
    `}
`

export const XXL = styled.h1<Props>`
  font-size: 32px;
  font-weight: ${(props: Props) => getWeight(props, Weight.BOLD)};
  ${style}
`

export const XL = styled.h2<Props>`
  font-size: 26px;
  font-weight: ${(props: Props) => getWeight(props, Weight.BOLD)};
  ${style}
`

export const X = styled.h3<Props>`
  font-size: 18px;
  font-weight: ${(props: Props) => getWeight(props, Weight.BOLD)};
  ${style}
`

export const M = styled.span<Props>`
  font-size: 16px;
  line-height: 28px;
  font-weight: ${(props: Props) => getWeight(props, Weight.NORMAL)};
  ${style}
`

export const S = styled.span<Props>`
  font-size: 14px;
  line-height: 24px;
  font-weight: ${(props: Props) => getWeight(props, Weight.NORMAL)};
  ${style}
`
