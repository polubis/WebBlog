import React, { ReactNode } from "react"
import styled, { css } from "styled-components"
import { SM_DOWN, SM_UP } from "../../utils/viewport"
import { useScroll } from "../../utils/useScroll"

const appear = css`
  transition: 0.2s all ease-in-out;

  &.hidden {
    opacity: 0;
    transform: translateY(15px);
  }

  &.visible {
    opacity: 1;
    transform: translateY(0);
  }
`

const Nav = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  ${appear};

  button svg {
    path {
      fill: black;
    }
  }

  .close-preview-view-btn {
    .letter {
      transform: translate(2.5px, 2.5px) scale(0.75);
    }
  }

  @media ${SM_DOWN} {
    display: grid;
    left: 20px;
    grid-template-columns: auto auto auto;
    grid-template-rows: auto auto auto;
    justify-content: center;
    gap: 12px;
  }

  @media ${SM_UP} {
    display: flex;
    flex-flow: wrap;

    & > *:not(:last-child) {
      margin-right: 12px;
    }
  }
`

interface SnippetToolboxProps {
  children: ReactNode
}

const SnippetToolbox = ({ children }: SnippetToolboxProps) => {
  const { direction } = useScroll()

  const actionsClass = direction === "down" ? "hidden" : "visible"

  return <Nav className={`main-view-code-nav ${actionsClass}`}>{children}</Nav>
}

export { SnippetToolbox }
