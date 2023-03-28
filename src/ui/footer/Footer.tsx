import React from "react"
import styled from "styled-components"
import { GreenOnLogo } from "../../components/GreenOnLogo"
import theme from "../../utils/theme"
import { LinkedinIcon } from "../icons"
import { M, S, X } from "../text"
import { Link as GatsbyLink } from "gatsby"
import Link from "../../components/link/Link"
import { L_DOWN, M_DOWN, T_DOWN } from "../../utils/viewport"
import { Article } from "../../models"
import Img from "gatsby-image"
import { Content } from "../layout"

const Container = styled.footer`
  background: ${theme.black};
  border-top: 2px solid ${theme.grayC};

  .ui-footer-gray {
    color: ${theme.grayD};
  }

  .ui-footer-primary {
    color: ${theme.primary};
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
    margin: 0 0 8px 0;

    @media ${T_DOWN} {
      margin: 0 8px 8px 0;
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

interface FooterProps {
  articles: Article[]
}

const Footer = ({ articles }: FooterProps) => {
  return (
    <Container className="ui-footer">
      <Content>
        <TopSection>
          <Section>
            <X>About us</X>
            <M>
              We're an educational platform that produces high quality articles,
              courses and teaching materials.{" "}
            </M>
            <M>
              You can join our community via{" "}
              <GatsbyLink className="ui-footer-primary" to="/blog-creator/">
                this form
              </GatsbyLink>
              .
            </M>
          </Section>
          <Section>
            <X>Recent articles</X>
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
            <X>Navigation</X>
            <Links>
              <Link to="/" activeStyle={{ color: theme.primary }}>
                Home
              </Link>
              <Link to="/articles/" activeStyle={{ color: theme.primary }}>
                Blog
              </Link>
              <Link to="/articles/" activeStyle={{ color: theme.primary }}>
                Articles
              </Link>
              <Link to="/authors/" activeStyle={{ color: theme.primary }}>
                Authors
              </Link>
              <Link to="/blog-creator/" activeStyle={{ color: theme.primary }}>
                Creator
              </Link>
            </Links>
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
          <CompanyWrapper>
            <S className="ui-footer-gray">Powered by GreenOn Software</S>
            <GreenOnLogo />
          </CompanyWrapper>
        </ContentFooter>
      </Content>
    </Container>
  )
}

export { Footer }
