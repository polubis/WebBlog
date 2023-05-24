import React, { ReactNode, useLayoutEffect } from "react"
import styled from "styled-components"
import { XL } from "../../ui"
import theme from "../../utils/theme"
import { useScrollToHtmlElement } from "../../utils/useScrollToHtmlElement"

const Header = styled.header`
  display: flex;
  flex-flow: column;
  padding-bottom: 16px;

  .heading {
    margin-bottom: 16px;
  }

  .frames {
    display: flex;
    align-items: center;
    overflow-x: auto;
    padding: 12px 0;

    & > *:not(:last-child) {
      margin-right: 12px;
    }

    .frame {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 160px;
      overflow: hidden;
      flex-shrink: 0;
      border: 2px solid transparent;

      &.active {
        border-color: ${theme.primary};
      }

      &:hover:not(.active) {
        border-color: transparent;
      }

      .panel {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        cursor: pointer;
        background: transparent;
        backdrop-filter: blur(5px);
        bottom: 0;
        display: none;
        flex-flow: column;
        justify-content: space-between;
        padding: 16px;
      }

      &:hover .panel {
        display: flex;
      }
    }
  }
`

const SnippetCreatorHeader = ({
  children,
  scrollToActiveWhen,
}: {
  children: ReactNode
  scrollToActiveWhen: string | number
}) => {
  const { scrollBottom } = useScrollToHtmlElement()

  useLayoutEffect(scrollBottom, [scrollToActiveWhen])

  return (
    <Header className="snippets">
      <XL className="heading">Compose your animated snippet</XL>
      {children}
    </Header>
  )
}

export { SnippetCreatorHeader }
