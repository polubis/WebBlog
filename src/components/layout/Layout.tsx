import React, { ReactNode, useMemo } from "react"
import { Article, Routes, Translated } from "../../models"
import { Footer, Layout, Navigation } from "../../ui"
import { sort } from "../../utils/sort"
import theme from "../../utils/theme"
import styled from "styled-components"
import { Link as GatsbyLink } from "gatsby"
import { GreenOnLogo } from "../GreenOnLogo"
import  {ExternalLink, ExternalLinkBtn} from "../link/Link"

interface LayoutProps {
  children: ReactNode
  articles: Article[]
  t: Translated
  routes: Routes
  discordUrl: string;
}

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

const JoinUsLink = styled(ExternalLink)`
  ${ExternalLinkBtn}
`


export default function ({ children, articles, t, routes, discordUrl }: LayoutProps) {
  

  const { links, homeLink, leftLinks, rightLinks } = useMemo(() => {
    const links = sort(
      Object.values(routes).map(route => ({
        ...route,
        label: t.navigation[route.key],
      })),
      "label"
    )
    const homeLink = links.find(link => link.key === "home")!
    const homeLessLinks = links.filter(link => link.key !== "home")
    const leftLinks = [...homeLessLinks].slice(0, 2)
    const rightLinks = [...homeLessLinks].slice(2, homeLessLinks.length)

    return { links, homeLink, leftLinks, rightLinks }
  }, [])

  return (
    <Layout
      navigation={
        <Navigation
          logo={
            <UnstyledLink to={homeLink.to} id="home-navigation-logo">
              <GreenOnLogo full />
            </UnstyledLink>
          }
          leftLinks={
            <>
              {leftLinks.map(link => (
                <Link
                  to={link.to}
                  key={link.to}
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
                  to={link.to}
                  key={link.to}
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
              {links.map(link => (
                <Link
                  to={link.to}
                  key={link.to}
                  activeStyle={activeStyle}
                  id={`home-navigation-mobile-link-${link.label}`}
                >
                  {link.label}
                </Link>
              ))}
            </>
          }
          action={
            <JoinUsLink id="home-navigation-join-button" href={discordUrl}>
              {t.join}
            </JoinUsLink>
          }
        />
      }
      footer={
        <Footer
          articles={articles}
          t={t}
          discordUrl={discordUrl}
          renderLinks={Link => (
            <>
              {links.map(link => (
                <Link key={link.key} to={link.to}>
                  {link.label}
                </Link>
              ))}
            </>
          )}
        />
      }
    >
      {children}
    </Layout>
  )
}

export { LayoutProps }
