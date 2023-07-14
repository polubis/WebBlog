import React, { ReactNode } from "react"
import { Layout, Navigation } from "../../ui"
import theme from "../../utils/theme"
import styled from "styled-components"
import { Link as GatsbyLink } from "gatsby"
import { useScrollToHtmlElement } from "../../utils/useScrollToHtmlElement"
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
    meta: { routes },
    t,
  } = useLayoutProvider()
  const { ref, scrollTop } = useScrollToHtmlElement<HTMLDivElement>()

  const homeLink = (
    <Link
      to={routes.home.to}
      key={routes.home.key}
      activeStyle={activeStyle}
      id={`home-navigation-link-${routes.home.key}`}
    >
      {t.home}
    </Link>
  )
  const articlesLink = (
    <Link
      to={routes.articles.to}
      key={routes.articles.key}
      activeStyle={activeStyle}
      id={`home-navigation-link-${routes.articles.key}`}
    >
      {t.articles}
    </Link>
  )
  const authorsLink = (
    <Link
      to={routes.authors.to}
      key={routes.authors.key}
      activeStyle={activeStyle}
      id={`home-navigation-link-${routes.authors.key}`}
    >
      {t.authors}
    </Link>
  )
  const coursesLink = (
    <Link
      to={routes.courses.to}
      key={routes.courses.key}
      activeStyle={activeStyle}
      id={`home-navigation-link-${routes.courses.key}`}
    >
      {t.courses}
    </Link>
  )
  const snippetsLink = (
    <Link
      to={routes.snippet_creator.to}
      key={routes.snippet_creator.key}
      activeStyle={activeStyle}
      id={`home-navigation-link-${routes.snippet_creator.key}`}
    >
      {t.snippets}
    </Link>
  )
  const createArticleLink = (
    <Link
      to={routes.creator.to}
      key={routes.creator.key}
      activeStyle={activeStyle}
      id={`home-navigation-link-${routes.creator.key}`}
    >
      {t.create_article}
    </Link>
  )

  return (
    <Layout
      ref={ref}
      navigation={
        <Navigation
          logo={
            <UnstyledLink to={routes.home.to} id="home-navigation-logo">
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
              id="home-navigation-join-button"
              href="https://discord.gg/PxXQayT3x3"
              title="Discord members"
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
      <SocialBar scrollToTopNode={<ScrollUpButton onClick={scrollTop} />} />
    </Layout>
  )
}

export { LayoutProps }
