import React, { useState, useCallback, ReactNode } from "react"
import styled, { css } from "styled-components"
import { GreenOnLogo } from "../../components/GreenOnLogo"
import theme from "../../utils/theme"
import { usePortal } from "../../utils/usePortal"
import { useScroll } from "../../utils/useScroll"
import { L_UP } from "../../utils/viewport"

const Expander = styled.aside<{ open: boolean }>`
  display: flex;
  flex-flow: column;
  justify-content: flex-end;
  position: fixed;
  right: 24px;
  bottom: 24px;
  z-index: 107;
  transition: 0.2s transform;
  cursor: pointer;
  background: ${theme.bg};
  border-radius: 50%;
  padding: 12px;
  border: 1px solid ${theme.grayC};

  @media ${L_UP} {
    display: none;
  }

  ${props =>
    props.open &&
    css`
      transform: scale(2) rotate(45deg);
    `}
`

const Navigation = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  z-index: 106;
  height: 100vh;
  width: 100vw;
  color: ${theme.white};
  background: ${theme.bg};

  & > * {
    padding: 16px 12px;
  }

  @media ${L_UP} {
    display: none;
  }
`

interface MobileNavigation {
  links: ReactNode
}

const MobileNavigation = ({ links }: MobileNavigation) => {
  const [isOpen, setIsOpen] = useState(false)
  const { render } = usePortal()
  const { direction } = useScroll()

  const toggleOpen = useCallback(() => {
    setIsOpen(prevOpen => !prevOpen)
  }, [])

  const isVisible = direction === "up" || direction === "idle"

  return render(
    <>
      {isVisible && (
        <Expander open={isOpen}>
          <GreenOnLogo onClick={toggleOpen} />
        </Expander>
      )}
      {isOpen && <Navigation>{links}</Navigation>}
    </>
  )
}

export { MobileNavigation }
