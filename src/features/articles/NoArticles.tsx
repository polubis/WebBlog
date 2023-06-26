import React, { ReactNode } from "react"

import styled from "styled-components"
import Section from "../../components/article/Section"
import { A, B, Hint, M, XL } from "../../ui"

const Footer = styled.div``

const Container = styled.div`
  & > * {
    margin: 0 auto;
    max-width: 500px;
  }

  ${Footer} {
    margin: 20px 0 40px 0;
  }
`

interface NoArticlesProps {
  children: ReactNode
}

const NoArticles = ({ children }: NoArticlesProps) => {
  return (
    <Container>
      <Section>
        <XL>No articles 🐼</XL>
        <M>
          Cannot provide articles for the filters specified. You can reset them
          with the <B>button below</B> or just <B>change them</B>.
        </M>
        <Footer>{children}</Footer>
        <Hint hasBg>
          Maybe you want to write the article yourself? Join our{" "}
          <A
            outside
            href="https://discord.com/channels/1090959521364586568/1100664861073088572"
          >
            Discord
          </A>{" "}
          and we will provide you with assistance.
        </Hint>
      </Section>
    </Container>
  )
}

export { NoArticles }
