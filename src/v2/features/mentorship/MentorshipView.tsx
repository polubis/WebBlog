import React, { useState, useMemo } from "react"
import Layout from "../../containers/Layout"
import { Content, M, RightArrowIcon, S, X, XL, XXL } from "../../../ui"
import { useLayoutProvider } from "../../providers/LayoutProvider"
import styled from "styled-components"
import { Link } from "gatsby"
import { useMentorshipPageProvider } from "./MentorshipPageProvider"
import { L_UP, T_UP } from "../../../utils/viewport"
import { Tabs } from "../../ui/tabs/Tabs"
import { Tab } from "../../ui/tabs/Tab"

const Container = styled.main`
  & > header {
    align-items: center;

    & > * {
      text-align: center;
    }

    ${XXL} {
      margin-bottom: 12px;
    }
  }

  .mentorship-view-plans-select {
    margin: 40px 0 20px 0;

    .tab {
      padding: 8px 12px;
    }
  }

  .mentorship-view-plans {
    display: grid;
    gap: 28px;
    justify-content: center;
    grid-template-columns: minmax(1fr, 320px);

    @media ${T_UP} {
      grid-template-columns: repeat(2, minmax(auto, 300px));
    }

    @media ${L_UP} {
      grid-template-columns: repeat(4, minmax(auto, 300px));
    }

    .mentorship-card {
      display: flex;
      flex-flow: column;
      align-items: center;
      padding: 20px;
      border-radius: 8px;

      & > ${XL} {
        margin: 8px 0 16px 0;
        text-align: center;
      }

      a {
        text-decoration: none;
      }

      ul {
        list-style: none;
        margin: 20px 0 0 0;
        padding: 0;

        & > *:not(:last-child) {
          margin-bottom: 8px;
        }

        li {
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          padding: 8px 12px;
          border-radius: 4px;
          background: #201f1f;

          &:hover {
            background: #161616;
          }

          a {
            display: flex;
            width: 100%;
            justify-content: space-between;
          }

          svg {
            flex-shrink: 0;
            margin-left: 12px;
          }

          path {
            fill: #fff;
          }
        }
      }
    }
  }
`

const MentorshipView = () => {
  const layout = useLayoutProvider()
  const mentorship = useMentorshipPageProvider()
  const [activePlan, setActivePlan] = useState(mentorship.t.plans[0])

  return (
    <Layout>
      <Content paddingY>
        <Container>
          <header className="col">
            <XXL>{mentorship.t.heading}</XXL>
            <X>{mentorship.t.heading_description}</X>
          </header>
          <section className="mentorship-view-plans-select center">
            <Tabs>
              {mentorship.t.plans.map(plan => (
                <Tab
                  key={plan.key}
                  active={plan.key === activePlan.key}
                  onClick={() => setActivePlan(plan)}
                >
                  <M>{plan.label}</M>
                </Tab>
              ))}
            </Tabs>
          </section>
          <section className="mentorship-view-plans">
            {activePlan.content.map(subscription => (
              <div
                className="mentorship-card free"
                key={subscription.label}
                style={{ background: subscription.bg }}
              >
                <X>{subscription.label}</X>
                <XL>{subscription.cost}</XL>
                <Link
                  to={layout.discord_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="upper button secondary">
                    {layout.t.try_it}
                  </button>
                </Link>
                <ul>
                  {subscription.bullets.map(bullet => (
                    <li key={bullet.label}>
                      <S>{bullet.label}</S>
                      <RightArrowIcon />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        </Container>
      </Content>
    </Layout>
  )
}

export { MentorshipView }
