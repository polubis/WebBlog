import React from "react"
import Section from "../components/article/Section"
import { B, M, XL } from "../ui"
import { Link } from "gatsby"
import styled from "styled-components"

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

export default function (): React.ReactElement {
  return (
    <Container className="center">
      <Section className="col">
        <XL>404 - Not Found</XL>
        <M>
          Oops! It seems like the page you are looking for doesn't exist. Please
          check the URL or go back to the <B>Home Page</B>.
        </M>
        <Link className="button upper primary" to="/">
          Home page
        </Link>
      </Section>
    </Container>
  )
}
