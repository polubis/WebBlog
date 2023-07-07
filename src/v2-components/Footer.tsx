import React, { useMemo } from "react"
import type { ReactNode } from "react"
import styled from "styled-components"
import Img from "gatsby-image"
import { Article, SiteName, SupportedExternalLink } from "../models"
import { LinkedinIcon } from "../ui/icons/LinkedinIcon"
import { DiscordIcon } from "../ui/icons/DiscordIcon"
import { GreenOnLogo } from "../components/GreenOnLogo"
import { FacebookIcon } from "../ui/icons/FacebookIcon"
import { L_DOWN, M_DOWN, T_DOWN } from "../utils/viewport"
import { Link as GLink } from "gatsby"

const Container = styled.footer`
  padding: 0 20px;
  background: #000;
  border-top: 2px solid #3c3c3c;

  .footer-wrapper {
    max-width: 1280px;
    margin: 0 auto;

    @media ${L_DOWN} {
      width: 100%;
    }
  }

  .footer-section {
    .h5 {
      margin-bottom: 16px;
    }

    .p1:last-of-type {
      margin-top: 4px;
    }
  }

  .footer-links {
    @media ${T_DOWN} {
      flex-flow: wrap;
    }

    & > *:not(:last-child) {
      margin: 0 0 12px 0;

      @media ${T_DOWN} {
        margin: 0 8px 12px 0;
      }
    }
  }

  .footer-articles {
    & > *:hover {
      outline: 2px solid #ff7878;
      border-radius: 4px;
    }

    & > *:not(:last-child) {
      margin: 0 8px 8px 0;
    }
  }

  .footer-bottom-section {
    padding: 12px 0 16px 0;
    border-top: 2px solid #3c3c3c;

    a {
      margin-right: 12px;
    }

    & > :last-child {
      margin-left: auto;
    }
  }

  .footer-company {
    @media ${M_DOWN} {
      .p2 {
        display: none;
      }
    }

    svg {
      margin-left: 4px;
      transform: scale(0.5);
    }
  }

  .footer-top-section {
    display: grid;
    grid-template-columns: 1fr 1.5fr 0.5fr;
    gap: 28px;
    padding: 32px 0 24px 0;

    @media ${T_DOWN} {
      grid-template-columns: 1fr;
      grid-template-rows: auto auto auto;
    }
  }
`

interface FooterProps {
  articles: Article[]
  t: {
    navigationLabel: string
    aboutUs: string
    aboutUsText: string
    aboutUsTextCommunity: string
    thisFormLink: string
    poweredBy: string
    recommendedArticles: string
  }
  links: ReactNode
}

const Footer = ({ articles, t, links }: FooterProps) => {
  const footerArticles = useMemo(() => [...articles].slice(0, 16), [articles])

  return (
    <Container>
      <div className="footer-wrapper col">
        <div className="footer-top-section">
          <div className="col footer-section">
            <h5 className="h5">{t.aboutUs}</h5>
            <p className="p1">{t.aboutUsText}</p>
            <p className="p1">
              {t.aboutUsTextCommunity}{" "}
              <a
                href={"https://discord.gg/PxXQayT3x3" as SupportedExternalLink}
                className="link p2 c-primary-1"
              >
                {t.thisFormLink}
              </a>
              .
            </p>
          </div>
          <div className="col footer-section">
            <h5 className="h5">{t.recommendedArticles}</h5>
            <div className="wrap footer-articles">
              {footerArticles.map(article => (
                <GLink
                  key={article.title}
                  to={article.path}
                  className="link"
                  activeClassName="active"
                >
                  <Img
                    fluid={article.thumbnail}
                    alt="Article thumbnail"
                    className="radius-1"
                    style={{
                      width: "60px",
                      height: "60px",
                    }}
                  />
                </GLink>
              ))}
            </div>
          </div>
          <div className="col footer-section">
            <h5 className="h5">{t.navigationLabel}</h5>
            <div className="col footer-links">{links}</div>
          </div>
        </div>
        <div className="row between footer-bottom-section">
          <a
            href={
              "https://www.linkedin.com/in/adrian-po%C5%82ubi%C5%84ski-281ab2172/" as SupportedExternalLink
            }
            title={`Linkedin ${"GreenOn Software" as SiteName} profile`}
            target="_blank"
          >
            <LinkedinIcon />
          </a>
          <a
            href={"https://discord.gg/PxXQayT3x3" as SupportedExternalLink}
            title={`${"GreenOn Software" as SiteName} Discord channel`}
            target="_blank"
          >
            <DiscordIcon />
          </a>
          <a
            href={
              "https://www.facebook.com/groups/1472987149805006/" as SupportedExternalLink
            }
            title={`${"GreenOn Software" as SiteName} Facebook profile`}
            target="_blank"
          >
            <FacebookIcon />
          </a>
          <div className="row footer-company">
            <p className="p2 c-gray-1">
              {t.poweredBy} {"GreenOn Software" as SiteName}
            </p>
            <GreenOnLogo />
          </div>
        </div>
      </div>
    </Container>
  )
}

export { Footer }
