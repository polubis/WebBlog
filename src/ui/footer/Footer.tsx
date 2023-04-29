import React, { ReactNode } from "react"
import styled from "styled-components"
import { GreenOnLogo } from "../../components/GreenOnLogo"
import theme from "../../utils/theme"
import { LinkedinIcon, DiscordIcon } from "../icons"
import { M, S, X } from "../text"
import Link from "../../components/link/Link"
import { L_DOWN, M_DOWN, T_DOWN } from "../../utils/viewport"
import { Article } from "../../models"
import Img from "gatsby-image"
import { Content } from "../layout"
import { Translated } from "../../models"
import ExternalLink, {ExternalRedirect} from "../../components/link/ExternalLink"
import { getDiscordUrl } from "../../utils/getDiscordUrl"

const Container = styled.footer`
  background: ${theme.black};
  border-top: 2px solid ${theme.grayC};

  .ui-footer-gray {
    color: ${theme.grayD};
  }

  & > .ui-layout-content {
    display: flex;
    flex-flow: column;

    @media ${L_DOWN} {
      width: 100%;
    }
  }
`

const ContentFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0 16px 0;
  border-top: 2px solid ${theme.grayC};

  .discord-link {
    margin-left: 12px;
  }

  & > :last-child {
    margin-left: auto;
  }
`

const CompanyWrapper = styled.div`
  display: flex;
  align-items: center;

  @media ${M_DOWN} {
    ${S} {
      display: none;
    }
  }

  svg {
    margin-left: 4px;
    transform: scale(0.5);
  }
`

const TopSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.5fr 0.5fr;
  gap: 28px;
  padding: 32px 0 24px 0;

  @media ${T_DOWN} {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto;
  }
`

const Section = styled.div`
  display: flex;
  flex-flow: column;

  ${X} {
    margin-bottom: 16px;
  }

  ${M}:last-of-type {
    margin-top: 4px;
  }
`

const Links = styled.div`
  display: flex;
  flex-flow: column;

  @media ${T_DOWN} {
    flex-flow: wrap;
  }

  & > *:not(:last-child) {
    margin: 0 0 12px 0;

    @media ${T_DOWN} {
      margin: 0 8px 12px 0;
    }
  }
`

const Articles = styled.div`
  display: flex;
  flex-flow: wrap;

  & > *:not(:last-child) {
    margin: 0 8px 8px 0;
  }
`

const Figure = styled.figure`
  margin: 0;
`

const DiscordLink = styled(ExternalLink)`
  ${ExternalRedirect}
`

interface FooterProps {
  articles: Article[]
  t: Translated
  renderLinks: (LinkComponent: typeof Link) => ReactNode
}

const Footer = ({ articles, t, renderLinks }: FooterProps) => {
   const discordUrl = getDiscordUrl()
   
  return (
    <Container className="ui-footer">
      <Content>
        <TopSection>
          <Section>
            <X>{t.footer.aboutUs}</X>
            <M>{t.footer.aboutUsText}</M>
            <M>
              {t.footer.aboutUsTextCommunity}{" "}
              <DiscordLink href={discordUrl} target="_blank" id="footer-join-us-link">
                {t.footer.thisLink}
              </DiscordLink>
              .
            </M>
          </Section>
          <Section>
            <X>{t.footer.recommendedArticles}</X>
            <Articles>
              {articles.map(article => (
                <Link key={article.title} to={article.path}>
                  <Figure>
                    <Img
                      fluid={article.thumbnail}
                      alt="Article thumbnail"
                      style={{
                        width: "60px",
                        height: "60px",
                      }}
                    />
                  </Figure>
                </Link>
              ))}
            </Articles>
          </Section>
          <Section>
            <X>{t.navigationLabel}</X>
            <Links>{renderLinks(Link)}</Links>
          </Section>
        </TopSection>
        <ContentFooter>
          <a
            href="https://www.linkedin.com/company/greenon-software/"
            title="Linkedin GreenOn Software profile"
            target="_blank"
          >
            <LinkedinIcon />
          </a>
          <a
            className="discord-link"
            href={discordUrl}
            title="GreenOn Software Discord channel"
            target="_blank"
          >
            <DiscordIcon />
          </a>
          <CompanyWrapper>
            <S className="ui-footer-gray">
              {t.footer.poweredBy} GreenOn Software
            </S>
            <GreenOnLogo />
          </CompanyWrapper>
        </ContentFooter>
      </Content>
    </Container>
  )
}

export { Footer }
