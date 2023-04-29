import React from "react"

import {css} from "styled-components"

import theme from "../../utils/theme"

interface LinkProps extends Partial<Omit<HTMLAnchorElement, 'children'>> {
    children: string;
}

export const BtnLink = css`
    text-transform: uppercase;
    background: none;
    font-size: 14px;
    font-weight: bolder;
    padding: 10px 18px;
    box-sizing: border-box;
    min-width: 72px;
    border-radius: 4px;
    cursor: pointer;
    font-family: inherit;
    text-decoration: none;
    border: 1px solid ${theme.primary};
    color: ${theme.primary};

    &:hover {
    background: ${theme.primary};
    color: ${theme.bg};
    }
`

export const ExternalRedirect = css`
    color: ${theme.primary};
    border: none;
    text-decoration: underline;
    background: none;
    font-size: 16px;
    line-height: 28px;
    cursor: pointer;
    padding: 0;

    &:hover {
    color: ${theme.primaryA};
    }
`

export default function (props: LinkProps): React.ReactElement {
  return <a {...(props as any)} target="_blank"/>
}
