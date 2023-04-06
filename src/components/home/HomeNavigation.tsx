import React from "react"
import { Navigation } from "../../ui"
import theme from "../../utils/theme"
import Button from "../button/Button"
import { GreenOnLogo } from "../GreenOnLogo"
import { Link as GatsbyLink } from "gatsby"
import styled from "styled-components"
import { useJoinUsModal } from "../article/WithJoinUsModal"

const leftLinks = [
  { label: "articles", url: "/articles/" },
  { label: "authors", url: "/authors/" },
] as const
const rightLinks = [
  { label: "courses", url: "/courses/" },
  { label: "creator", url: "/blog-creator/" },
] as const
const otherLinks = [{ label: "home", url: "/" }] as const
const allLinks = [...leftLinks, ...rightLinks, ...otherLinks].sort((a, b) => {
  if (a.label > b.label) return 1
  if (a.label === b.label) return 0
  return -1
})

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
  const ctx = useJoinUsModal()

  return (
    <Navigation
      logo={
        <UnstyledLink to={otherLinks[0].url} id="home-navigation-logo">
          <GreenOnLogo full />
        </UnstyledLink>
      }
      leftLinks={
        <>
          {leftLinks.map(link => (
            <Link
              to={link.url}
              key={link.url}
              activeStyle={activeStyle}
              id={`home-navigation-link-${link.label}`}
            >
              {link.label}
            </Link>
          ))}
        </>
      }
      rightLinks={
        <>
          {rightLinks.map(link => (
            <Link
              to={link.url}
              key={link.url}
              activeStyle={activeStyle}
              id={`home-navigation-link-${link.label}`}
            >
              {link.label}
            </Link>
          ))}
        </>
      }
      mobileLinks={
        <>
          {allLinks.map(link => (
            <Link
              to={link.url}
              key={link.url}
              activeStyle={activeStyle}
              id={`home-navigation-mobile-link-${link.label}`}
            >
              {link.label}
            </Link>
          ))}
        </>
      }
      action={
        <Button id="home-navigation-join-button" onClick={ctx.open}>
          JOIN
        </Button>
      }
    />
  )
}

export { HomeNavigation }
