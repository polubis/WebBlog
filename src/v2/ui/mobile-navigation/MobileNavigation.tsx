import React, { useState } from "react"
import styled from "styled-components"
import theme from "../../../utils/theme"
import { L_UP, M_UP } from "../../../utils/viewport"
import { usePortal } from "../../../utils/usePortal"
import { useScroll } from "../../../utils/useScroll"
import { CloseIcon, IconButton, ListIcon } from "../../../ui"
import type { MobileNavigationProps } from "./models"

const Wrapper = styled.div`
  display: flex;
  background: ${theme.bg};
  padding: 36px 20px 20px 20px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 103;
  overflow-y: auto;

  .components-course-chapters {
    margin: auto auto 0 auto;
    width: 100%;

    @media ${M_UP} {
      width: 400px;
    }
  }
`

const CloseButtonWrapper = styled.div`
  position: absolute;
  z-index: 104;
  top: 20px;
  right: 20px;
`

const Expander = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 104;

  @media ${L_UP} {
    display: none;
  }

  path {
    fill: ${theme.black};
  }
`

const MobileNavigation = ({ children }: MobileNavigationProps) => {
  const { render } = usePortal()
  const { direction, offsetY } = useScroll({ strategy: "throttle" })
  const [open, setOpen] = useState(false)

  const toggleOpen = (): void => {
    setOpen(prev => !prev)
  }

  return render(
    <>
      {!open && direction === "up" && offsetY > 150 && (
        <Expander>
          <IconButton rounded size="medium" onClick={toggleOpen}>
            <ListIcon />
          </IconButton>
        </Expander>
      )}
      {open && (
        <Wrapper>
          {children}
          <CloseButtonWrapper>
            <IconButton
              rounded
              size="medium"
              variant="secondary-outlined"
              onClick={toggleOpen}
            >
              <CloseIcon />
            </IconButton>
          </CloseButtonWrapper>
        </Wrapper>
      )}
    </>
  )
}

export { MobileNavigation }
