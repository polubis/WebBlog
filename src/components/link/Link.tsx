import React from "react"
import { Link as GatsbyLink, GatsbyLinkProps } from "gatsby"

import styled, { css } from "styled-components"

import theme from "../../utils/theme"

const Link = styled(GatsbyLink)`
  font-size: 16px;
  font-weight: bolder;
  color: ${theme.secondary};
  text-decoration: none;
  text-transform: uppercase;
`
export const ExternalLinkBtn = css`
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
interface LinkProps extends Partial<Omit<HTMLAnchorElement, 'children'>> {
  children: string;
}

export const ExternalLink = (props: LinkProps): React.ReactElement  => {
  return <a {...(props as any)} target="_blank"/>
}

export default function (props: GatsbyLinkProps<unknown>): React.ReactElement {
  return <Link {...(props as any)} />
}
