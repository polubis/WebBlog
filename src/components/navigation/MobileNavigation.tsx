import React, { useState, useCallback } from "react"

import styled, { css } from "styled-components"

import Logo from "../logo/Logo"
import { L_UP } from "../../utils/viewport"
import Links from "./Links"
import theme from "../../utils/theme"
import { GreenOnLogo } from "../GreenOnLogo"
import { useScrollMetadata } from "../../utils/useScrollMetadata"

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

export default function ({ greenVariant }: MobileNavigationProps) {
  const [open, setOpen] = useState(false)

  const toggleOpen = useCallback(() => {
    setOpen(prevOpen => !prevOpen)
  }, [])

  const { direction } = useScrollMetadata()

  return (
    <>
      {!open && (direction === "up" || direction === "idle") && (
        <Expander greenVariant={greenVariant} open={false}>
          {greenVariant ? (
            <GreenOnLogo onClick={toggleOpen} />
          ) : (
            <Logo rotated={false} slim={false} onClick={toggleOpen} />
          )}
        </Expander>
      )}

      {open && (
        <>
          <Expander greenVariant={greenVariant} open>
            {greenVariant ? (
              <GreenOnLogo onClick={toggleOpen} />
            ) : (
              <Logo rotated slim onClick={toggleOpen} />
            )}
          </Expander>
          <Navigation>
            <Links
              items={[
                { label: "home", url: "/" },
                { label: "articles", url: "/articles/" },
                { label: "courses", url: "/courses/" },
                { label: "creator", url: "/blog-creator/" },
                { label: "authors", url: "/authors/" },
              ]}
            />
          </Navigation>
        </>
      )}
    </>
  )
}
