import React, { ReactNode } from "react"
import { Article, Routes, Translated } from "../../models"
import { Footer, Layout, Navigation } from "../../ui"
import theme from "../../utils/theme"
import styled from "styled-components"
import { Link as GatsbyLink } from "gatsby"
import { GreenOnLogo } from "../GreenOnLogo"
import Button from "../button/Button"
import { ScrollUpButton } from "../scroll-up-button/ScrollUpButton"
import { useScrollToHtmlElement } from "../../utils/useScrollToHtmlElement"
import { SocialBar } from "../social-bar/Socialbar"

interface LayoutProps {
  children: ReactNode
  articles: Article[]
  t: Translated
  routes: Routes
  disableSocialBar?: boolean
  disableFooter?: boolean
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

export default function ({
  children,
  articles,
  t,
  routes,
  disableSocialBar,
  disableFooter,
}: LayoutProps) {
  const { ref, scrollTop } = useScrollToHtmlElement<HTMLDivElement>()

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
      to={routes.snippetCreator.to}
      key={routes.snippetCreator.key}
      activeStyle={activeStyle}
      id={`home-navigation-link-${routes.snippetCreator.key}`}
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
      {t.createArticle}
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
            </>
          }
          rightLinks={
            <>
              {coursesLink}
              {snippetsLink}
            </>
          }
          mobileLinks={
            <>
              {articlesLink}
              {authorsLink}
              {coursesLink}
              {createArticleLink}
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
        disableFooter || (
          <Footer
            articles={articles}
            t={t}
            links={
              <>
                {articlesLink}
                {authorsLink}
                {coursesLink}
                {createArticleLink}
                {snippetsLink}
              </>
            }
          />
        )
      }
    >
      {children}
      {disableSocialBar || (
        <SocialBar scrollToTopNode={<ScrollUpButton onClick={scrollTop} />} />
      )}
    </Layout>
  )
}

export { LayoutProps }
