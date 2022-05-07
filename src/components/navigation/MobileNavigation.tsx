import React, { useState, useCallback } from "react"

import styled from "styled-components"

import { usePortal } from "../../utils/usePortal"
import Logo from "../logo/Logo"
import { L_UP } from "../../utils/viewport"
import Links from "./Links"
import theme from "../../utils/theme"
import { useDocumentScrollDisable } from "../../utils/useDocumentScrollDisable"

const Expander = styled.aside`
  display: flex;
  flex-flow: column;
  justify-content: flex-end;
  position: fixed;
  right: 24px;
  bottom: 24px;
  z-index: 102;

  @media ${L_UP} {
    display: none;
  }
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

export default function (): React.ReactElement {
  const [open, setOpen] = useState(false)

  const render = usePortal()

  const toggleOpen = useCallback(() => {
    setOpen(prevOpen => !prevOpen)
  }, [])

  useDocumentScrollDisable(open)

  return render(
    <>
      <Expander>
        <Logo rotated={open} slim={open} onClick={toggleOpen} />
      </Expander>
      {open && (
        <Navigation>
          <Links
            items={[
              { label: "home", url: "/" },
              { label: "articles", url: "/articles" },
              { label: "authors", url: "/authors" },
            ]}
          />
        </Navigation>
      )}
    </>
  )
}
