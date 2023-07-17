import React, { ReactNode } from "react"
import { Layout, Navigation } from "../../ui"
import theme from "../../utils/theme"
import styled from "styled-components"
import { Link as GatsbyLink } from "gatsby"
import { GreenOnLogo } from "../../components/GreenOnLogo"
import Button from "../../components/button/Button"
import { SocialBar } from "../../components/social-bar/Socialbar"
import { ScrollUpButton } from "../../components/scroll-up-button/ScrollUpButton"
import { useLayoutProvider } from "../providers/LayoutProvider"
import { Footer } from "./Footer"

interface LayoutProps {
  children: ReactNode
}

const activeStyle = { color: theme.primary }

const Link = styled(GatsbyLink)`
  font-size: 16px;
  font-weight: bolder;
  color: ${theme.secondary};
  text-decoration: none;
  text-transform: uppercase;

  &:hover {
    color: ${theme.primary};
  }
`

const UnstyledLink = styled(GatsbyLink)`
  text-decoration: none;
`

export default function ({ children }: LayoutProps) {
  const {
    meta: { routes, discord_url },
    t,
  } = useLayoutProvider()

  const homeLink = (
    <Link to={routes.home.to} key={routes.home.key} activeStyle={activeStyle}>
      {t.home}
    </Link>
  )
  const articlesLink = (
    <Link
      to={routes.articles.to}
      key={routes.articles.key}
      activeStyle={activeStyle}
    >
      {t.articles}
    </Link>
  )
  const authorsLink = (
    <Link
      to={routes.authors.to}
      key={routes.authors.key}
      activeStyle={activeStyle}
    >
      {t.authors}
    </Link>
  )
  const coursesLink = (
    <Link
      to={routes.courses.to}
      key={routes.courses.key}
      activeStyle={activeStyle}
    >
      {t.courses}
    </Link>
  )
  const snippetsLink = (
    <Link
      to={routes.snippet_creator.to}
      key={routes.snippet_creator.key}
      activeStyle={activeStyle}
    >
      {t.snippets}
    </Link>
  )
  const createArticleLink = (
    <Link
      to={routes.creator.to}
      key={routes.creator.key}
      activeStyle={activeStyle}
    >
      {t.create_article}
    </Link>
  )

  return (
    <Layout
      navigation={
        <Navigation
          logo={
            <UnstyledLink to={routes.home.to}>
              <GreenOnLogo full />
            </UnstyledLink>
          }
          leftLinks={
            <>
              {articlesLink}
              {authorsLink}
              {coursesLink}
            </>
          }
          rightLinks={
            <>
              {createArticleLink}
              {snippetsLink}
            </>
          }
          mobileLinks={
            <>
              {articlesLink}
              {authorsLink}
              {coursesLink}
              {createArticleLink}
              {homeLink}
              {snippetsLink}
            </>
          }
          action={
            <a
              href={discord_url}
              title={t.discord_channel}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button>{t.join}</Button>
            </a>
          }
        />
      }
      footer={
        <Footer
          links={
            <>
              {articlesLink}
              {authorsLink}
              {coursesLink}
              {createArticleLink}
              {homeLink}
              {snippetsLink}
            </>
          }
        />
      }
    >
      {children}
      <SocialBar
        scrollToTopNode={
          <ScrollUpButton
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          />
        }
      />
    </Layout>
  )
}

export { LayoutProps }
