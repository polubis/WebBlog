import React from "react"
import styled from "styled-components"
import Divider from "../divider/Divider"
import { BlogLogo } from "./BlogLogo"
import Button from "../button/Button"
import theme from "../../utils/theme"
import Links from "../navigation/Links"
import { Link } from "gatsby"
import { L_UP, T_DOWN } from "../../utils/viewport"
import { GreenOnLogo } from "../GreenOnLogo"

const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 99px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  border-bottom: 1px solid #565656;
  padding: 0 32px;
  z-index: 100;
  background: ${theme.bg};

  @media ${L_UP} {
    padding: 0 104px;
  }

  & > a {
    display: none;

    @media ${L_UP} {
      display: block;
    }
  }
`

const LinksContainer = styled.div`
  display: flex;
  align-items: center;

  & > *:not(:first-child) {
    margin-left: 62px;
  }
`

const MidContent = styled.div`
  display: flex;
  align-items: center;
  padding-right: 24px;

  @media ${L_UP} {
    padding-right: 0;
  }

  @media ${T_DOWN} {
    display: none;
  }

  ${Divider} {
    margin: 0 62px;
  }
`

export const HomeNavigation = () => {
  return (
    <Container>
      <GreenOnLogo full />

      <MidContent>
        <LinksContainer>
          <Links
            items={[
              { label: "creator", url: "/blog-creator" },
              { label: "authors", url: "/authors" },
            ]}
          />
        </LinksContainer>
        <Divider />
        <BlogLogo full />
      </MidContent>

      <Link to="/authors/">
        <Button>JOIN</Button>
      </Link>
    </Container>
  )
}
