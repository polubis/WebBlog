import React, { useState, useCallback } from "react"

import styled, { css } from "styled-components"

import { usePortal } from "../../utils/usePortal"
import Logo from "../logo/Logo"
import { L_UP } from "../../utils/viewport"
import Links from "./Links"
import theme from "../../utils/theme"
import { useDocumentScrollDisable } from "../../utils/useDocumentScrollDisable"
import { GreenOnLogo } from "../GreenOnLogo"

const Expander = styled.aside<{ greenVariant?: boolean; open: boolean }>`
  display: flex;
  flex-flow: column;
  justify-content: flex-end;
  position: fixed;
  right: 24px;
  bottom: 24px;
  z-index: 102;
  cursor: pointer;

  @media ${L_UP} {
    display: none;
  }

  ${props =>
    props.greenVariant &&
    css`
      background: ${theme.bg};
      border-radius: 50%;
      padding: 12px;
      border: 1px solid #565656;
    `}

  ${props =>
    props.greenVariant &&
    props.open &&
    css`
      transition: 0.4s ease-in-out all;
      transform: scale(2) rotate(45deg);
      opacity: 0.4;
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
  z-index: 101;
  height: 100vh;
  width: 100vw;
  background: ${theme.bg};

  & > a {
    text-align: center;
    padding: 16px 12px;
  }

  @media ${L_UP} {
    display: none;
  }
`

interface MobileNavigationProps {
  greenVariant?: boolean
}

export default function ({
  greenVariant,
}: MobileNavigationProps): React.ReactElement {
  const [open, setOpen] = useState(false)

  const render = usePortal()

  const toggleOpen = useCallback(() => {
    setOpen(prevOpen => !prevOpen)
  }, [])

  useDocumentScrollDisable(open)

  return render(
    <>
      <Expander greenVariant={greenVariant} open={open}>
        {greenVariant ? (
          <GreenOnLogo onClick={toggleOpen} />
        ) : (
          <Logo rotated={open} slim={open} onClick={toggleOpen} />
        )}
      </Expander>
      {open && (
        <Navigation>
          <Links
            items={[
              { label: "home", url: "/" },
              { label: "articles", url: "/articles" },
              { label: "creator", url: "/blog-creator" },
              { label: "authors", url: "/authors" },
            ]}
          />
        </Navigation>
      )}
    </>
  )
}
