import React, { ReactNode } from "react"
import styled from "styled-components"
import { XL } from "../../ui"
import theme from "../../utils/theme"

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
      max-width: 300px;
      overflow: hidden;
      flex-shrink: 0;
      border: 2px solid transparent;

      &.active {
        border-color: ${theme.primary};
      }

      &:hover:not(.active) {
        border-color: transparent;
      }

      pre {
        transform: scale(0.4);
      }

      .frame-badge {
        position: absolute;
        top: 20px;
        right: 20px;
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
        justify-content: flex-end;
        padding: 16px;

        & > *:not(:last-child) {
          margin-right: 12px;
        }
      }

      &:hover .panel {
        display: flex;
      }
    }
  }
`

const SnippetCreatorHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Header className="snippets">
      <XL className="heading">Add or remove snippet frames</XL>
      {children}
    </Header>
  )
}

export { SnippetCreatorHeader }
