import React, { useState, useCallback, ReactNode } from "react"
import styled, { css } from "styled-components"
import { GreenOnLogo } from "../../components/GreenOnLogo"
import theme from "../../utils/theme"
import { usePortal } from "../../utils/usePortal"
import { L_UP } from "../../utils/viewport"
import { useScroll } from "../../utils/useScroll"

const Expander = styled.aside<{ open: boolean }>`
  justify-content: flex-end;
  position: fixed;
  right: 20px;
  bottom: 20px;
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
  const { direction } = useScroll({ strategy: "throttle" })

  const toggleOpen = useCallback(() => {
    setIsOpen(prevOpen => !prevOpen)
  }, [])

  const isVisible = direction === "up" || direction === "idle"

  return render(
    <>
      {isVisible && (
        <Expander className="col" open={isOpen}>
          <GreenOnLogo onClick={toggleOpen} />
        </Expander>
      )}
      {isOpen && <Navigation className="center col">{links}</Navigation>}
    </>
  )
}

export { MobileNavigation }
