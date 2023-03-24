import React, { ReactNode } from "react"
import styled from "styled-components"
import Divider from "../../components/divider/Divider"
import theme from "../../utils/theme"
import { L_UP, T_DOWN } from "../../utils/viewport"
import Loadable from "react-loadable"
import { Content } from "./Content"

const MobileNavigation = Loadable({
  loader: () => import("./MobileNavigation").then(m => m.MobileNavigation),
  loading: () => null,
})

const Container = styled.header`
  height: 99px;
  border-bottom: 1px solid ${theme.grayC};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: ${theme.bg};

  & > .ui-layout-content {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .ui-layout-links-container {
      display: none;
      align-items: center;
      padding-right: 24px;

      @media ${L_UP} {
        padding-right: 0;
        display: flex;
      }

      @media ${T_DOWN} {
        display: none;
      }

      ${Divider} {
        margin: 0 62px;
      }

      .ui-layout-links {
        display: flex;
        align-items: center;

        & > *:not(:first-child) {
          margin-left: 62px;
        }
      }
    }
  }
`

interface NavigationProps {
  logo: ReactNode
  leftLinks: ReactNode
  rightLinks: ReactNode
  action: ReactNode
  mobileLinks: ReactNode
}

const Navigation = ({
  logo,
  leftLinks,
  rightLinks,
  mobileLinks,
  action,
}: NavigationProps) => {
  return (
    <>
      <Container className="ui-layout-navigation">
        <Content>
          {logo}

          <div className="ui-layout-links-container">
            <nav className="ui-layout-links">{leftLinks}</nav>
            <Divider />
            <nav className="ui-layout-links">{rightLinks}</nav>
          </div>

          {action}
        </Content>
      </Container>
      <MobileNavigation links={mobileLinks} />
    </>
  )
}

export type { NavigationProps }

export { Navigation }
