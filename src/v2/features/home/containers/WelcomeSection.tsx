import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import { L_DOWN, M_DOWN, T_DOWN } from "../../../../utils/viewport"
import theme from "../../../../utils/theme"
import { M, XXL } from "../../../../ui"
import { useLayoutProvider } from "../../../providers/LayoutProvider"
import { useHomePageProvider } from "../HomePageProvider"
import { ManGraphic } from "../components/ManGraphic"

const Container = styled.section`
  padding: 76px 20px;
  background: ${theme.bg};
  border-top: 1px solid ${theme.grayC};
  border-bottom: 1px solid ${theme.grayC};

  @media ${T_DOWN} {
    padding: 32px 20px;
  }

  .wrapper {
    justify-content: space-between;
    max-width: 1000px;
    margin: 0 auto;

    .text-content {
      max-width: 400px;
      z-index: 1;

      & > *:nth-child(2) {
        margin: 22px 0 48px 0;
      }

      & > button {
        margin-right: auto;
      }
    }

    svg {
      flex-shrink: 0;
    }

    @media ${L_DOWN} {
      max-width: 900px;

      .text-content {
        margin-right: 48px;
        max-width: 100%;
      }

      & > *:nth-child(2) {
        @media ${T_DOWN} {
          display: none;
        }
      }
    }

    @media ${M_DOWN} {
      .text-content {
        margin-right: 0;
      }
    }
  }
`

export const WelcomeSection = () => {
  const layout = useLayoutProvider()
  const home = useHomePageProvider()

  return (
    <Container>
      <div className="wrapper row">
        <div className="text-content col">
          <XXL>{home.t.jumbo_boost_heading}</XXL>
          <M>{home.t.jumbo_boost_description}</M>
          <Link className="button primary upper" to={layout.routes.articles.to}>
            {home.t.check_blog}
          </Link>
        </div>
        <ManGraphic />
      </div>
    </Container>
  )
}
