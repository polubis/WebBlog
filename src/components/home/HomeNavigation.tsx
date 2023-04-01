import React from "react"
import { Navigation } from "../../ui"
import theme from "../../utils/theme"
import Button from "../button/Button"
import { GreenOnLogo } from "../GreenOnLogo"
import { Link as GatsbyLink } from "gatsby"
import styled from "styled-components"

const leftLinks = [
  { label: "creator", url: "/blog-creator/" },
  { label: "authors", url: "/authors/" },
] as const
const rightLinks = [
  { label: "articles", url: "/articles/" },
  { label: "courses", url: "/courses/" },
] as const
const otherLinks = [{ label: "home", url: "/" }] as const
const allLinks = [...otherLinks, ...rightLinks, ...leftLinks]

const activeStyle = { color: theme.primary }

const Link = styled(GatsbyLink)`
  font-size: 16px;
  font-weight: bolder;
  color: ${theme.secondary};
  text-decoration: none;
  text-transform: uppercase;
`

const UnstyledLink = styled(GatsbyLink)`
  text-decoration: none;
`

const HomeNavigation = () => {
  return (
    <Navigation
      logo={
        <UnstyledLink to={otherLinks[0].url}>
          <GreenOnLogo full />
        </UnstyledLink>
      }
      leftLinks={
        <>
          {leftLinks.map(link => (
            <Link to={link.url} key={link.url} activeStyle={activeStyle}>
              {link.label}
            </Link>
          ))}
        </>
      }
      rightLinks={
        <>
          {rightLinks.map(link => (
            <Link to={link.url} key={link.url} activeStyle={activeStyle}>
              {link.label}
            </Link>
          ))}
        </>
      }
      mobileLinks={
        <>
          {allLinks.map(link => (
            <Link to={link.url} key={link.url} activeStyle={activeStyle}>
              {link.label}
            </Link>
          ))}
        </>
      }
      action={
        <UnstyledLink data-id='HomeNavigationJoinLink' to={leftLinks[1].url}>
          <Button>JOIN</Button>
        </UnstyledLink>
      }
    />
  )
}

export { HomeNavigation }
