import React, { ReactNode } from "react"
import styled from "styled-components"
import { GreenOnLogo } from "../../components/GreenOnLogo"
import theme from "../../utils/theme"
import Link from "../../components/link/Link"
import { L_DOWN, M_DOWN, T_DOWN } from "../../utils/viewport"
import Img from "gatsby-image"
import { A, Content, DiscordIcon, LinkedinIcon, M, S, X } from "../../ui"
import { FacebookIcon } from "../../ui/icons/FacebookIcon"
import { useLayoutProvider } from "../providers/LayoutProvider"

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

  .footer-articles {
    a {
      &:hover {
        outline: 2px solid ${theme.primary};
      }
    }

    & > *:not(:last-child) {
      margin: 0 12px 12px 0;
    }
  }

  .footer-articles-content {
    padding: 12px 0 16px 0;
    justify-content: space-between;
    border-top: 2px solid ${theme.grayC};

    .icon-link {
      margin-left: 12px;
    }

    & > :last-child {
      margin-left: auto;
    }
  }

  .footer-company {
    @media ${M_DOWN} {
      ${S} {
        display: none;
      }
    }

    svg {
      margin-left: 4px;
      transform: scale(0.5);
    }
  }

  .footer-section {
    ${X} {
      margin-bottom: 16px;
    }

    ${M}:last-of-type {
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

  .footer-img-wrapper {
    margin: 0;
  }
`

interface FooterProps {
  links: ReactNode
}

const Footer = ({ links }: FooterProps) => {
  const layout = useLayoutProvider()

  return (
    <Container className="ui-footer">
      <Content>
        <div className="footer-top-section">
          <div className="footer-section col">
            <X>{layout.t.about_us}</X>
            <M>{layout.t.about_us_text}</M>
            <M>
              {layout.t.about_us_text_community}{" "}
              <A outside href={layout.discord_url} className="form-button">
                {layout.t.this_form_link}
              </A>
              .
            </M>
          </div>
          <div className="footer-section col">
            <X>{layout.t.recommended_articles}</X>
            <div className="footer-articles wrap">
              {layout.articles.map(article => (
                <Link
                  style={{
                    width: article.thumbnail.width,
                    height: article.thumbnail.height,
                  }}
                  className="r1"
                  key={article.title}
                  to={article.path}
                >
                  <Img
                    fixed={article.thumbnail}
                    alt={article.title}
                    title={article.title}
                    className="r1 shadow1"
                  />
                </Link>
              ))}
            </div>
          </div>
          <div className="footer-section col">
            <X>{layout.t.navigation_label}</X>
            <div className="footer-links col">{links}</div>
          </div>
        </div>
        <div className="footer-articles-content row">
          <a
            href={layout.linkedin_url}
            title={`${layout.site_name} ${layout.t.linkedin_profile}`}
            target="_blank"
          >
            <LinkedinIcon />
          </a>
          <a
            className="icon-link"
            href={layout.discord_url}
            title={`${layout.site_name} ${layout.t.discord_channel}`}
            target="_blank"
          >
            <DiscordIcon />
          </a>
          <a
            className="icon-link"
            href={layout.fb_url}
            title={`${layout.site_name} ${layout.t.fb_profile}`}
            target="_blank"
          >
            <FacebookIcon />
          </a>
          <div className="footer-company row">
            <S className="ui-footer-gray">
              {layout.t.powered_by} {layout.site_name}
            </S>
            <GreenOnLogo />
          </div>
        </div>
      </Content>
    </Container>
  )
}

export { Footer }
