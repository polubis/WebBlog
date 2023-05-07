import React, { ReactNode, useMemo } from "react"
import { Article, Routes, Translated } from "../../models"
import { Footer, Layout, Navigation } from "../../ui"
import { sort } from "../../utils/sort"
import theme from "../../utils/theme"
import styled from "styled-components"
import { Link as GatsbyLink } from "gatsby"
import { GreenOnLogo } from "../GreenOnLogo"
import Button from "../button/Button"
import { useJoinUsModal } from "../article/WithJoinUsModal"

interface LayoutProps {
  children: ReactNode
  articles: Article[]
  t: Translated
  routes: Routes
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

export default function ({ children, articles, t, routes }: LayoutProps) {
  const ctx = useJoinUsModal()

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
            <>
              <Link
                to="https://discord.gg/uJa3KUfFpj"
                id="home-navigation-link-discord"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/discord.png"
                  alt="GreenOn Software Discord channel"
                />
              </Link>

              <Link
                to="https://www.linkedin.com/company/greenon-software/"
                id="home-navigation-link-linkedin"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/linkedin.png"
                  alt="GreenOn Software LinkedIn profile"
                />
              </Link>

              <Button id="home-navigation-join-button" onClick={ctx.open}>
                {t.join}
              </Button>
            </>
          }
        />
      }
      footer={
        <Footer
          articles={articles}
          t={t}
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
