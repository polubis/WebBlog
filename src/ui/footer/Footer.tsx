import React from "react"
import styled from "styled-components"
import { GreenOnLogo } from "../../components/GreenOnLogo"
import theme from "../../utils/theme"
import { LinkedinIcon } from "../icons"
import { S } from "../text"

const Container = styled.footer`
  background: ${theme.black};
  padding: 24px 0 0 0;

  .ui-footer-gray {
    color: ${theme.grayD};
  }
`

const Content = styled.div`
  display: flex;
  flex-flow: column;
  width: 900px;
  margin: 0 auto;
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

  svg {
    margin-left: 4px;
    transform: scale(0.5);
  }
`

const Footer = () => {
  return (
    <Container className="ui-footer">
      <Content>
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
