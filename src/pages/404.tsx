import React from "react"
import Section from "../components/article/Section"
import { M, XL } from "../ui"
import { Link } from "gatsby"
import styled from "styled-components"
import { useLang } from "../v2/core/useLang"
import t_404_en from "../v2/translation/404/en.json"
import t_404_pl from "../v2/translation/404/pl.json"

const lookup = {
  pl: t_404_pl,
  en: t_404_en,
}

const Container = styled.div`
  height: 100vh;

  .col {
    margin: auto;
    max-width: 400px;
    padding: 20px;
  }

  a {
    margin-top: 20px;
  }
`

export default function () {
  const lang = useLang()

  if (!lang) return null

  const content = lookup[lang]

  return (
    <Container className="center">
      <Section className="col">
        <XL>{content.heading}</XL>
        <M>{content.description}</M>
        <Link className="button upper primary" to="/">
          {content.home_page}
        </Link>
      </Section>
    </Container>
  )
}
