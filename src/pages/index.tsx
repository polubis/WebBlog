import React from "react"

import Layout from "../components/layout/Layout"
import { SiteMeta } from "../utils/SiteMeta"
import { XXL, M } from "../ui"
import styled, { css, keyframes } from "styled-components"
import { T_UP } from "../utils/viewport"
import { Link } from "gatsby"
import Button from "../components/button/Button"

interface SectionProps {
  jumbo?: boolean
}

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-15px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const animateGreenColor = keyframes`
  0% {
    color: #a0f6a0;
  }

  20% {
    color: #7cfd7c;
  }

  40% {
    color: #28ff28;
  }
  
  60% {
    color: #06c506;
  }

  80% {
    color: #28ff28;
  }

  100% {
    color: #a0f6a0;
  }
`

const animateDot = keyframes`
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(100%);
    opacity: 1;
  }
  100% {
    transform: scale(0%);
    opacity: 0;
  }
`

const AnimatedDot = styled.div`
  position: absolute;
  width: 50px;
  background: #eae7e721;
  opacity: 0;
  height: 50px;
  border-radius: 50%;
  top: -2px;
  left: -12px;
  transform: scale(0);
  animation: ${animateDot} 1.2s ease-in-out 1.4s infinite;
`

const Section = styled.section<SectionProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;

  ${props =>
    props.jumbo &&
    css`
      margin: 150px 0 100px 0;

      @media ${T_UP} {
        width: 1080px;
        margin: 150px auto 100px auto;
      }

      ${XXL} {
        animation: ${slideIn} 0.4s ease-in-out 0s forwards;
        opacity: 0;

        span {
          position: relative;
          color: #a0f6a0;
          animation: ${animateGreenColor} 5s ease-in-out 1.2s infinite;
        }
      }

      ${M} {
        margin-top: 12px;
        max-width: 520px;
        opacity: 0;
        animation: ${slideIn} 0.4s ease-in-out 0.4s forwards;
      }

      button {
        opacity: 0;
        animation: ${slideIn} 0.4s ease-in-out 0.8s forwards;
        margin-top: 32px;
      }
    `}
`

const Container = styled.div`
  position: relative;
  display: flex;
  flex-flow: column;
`

const dash = keyframes`
  from {
    stroke-dashoffset: 1000;
  }
  to {
    stroke-dashoffset: 0;
  }
`

const GraphSvg = styled.svg`
  position: absolute;
  right: 0;
  bottom: 0;
  top: 0;
  width: 468px;
  height: 548px;

  circle {
    fill: #a0f6a0;
  }

  path {
    stroke-dasharray: 1000;
    stroke-dashoffset: 1000;
    animation: ${dash} 20s linear alternate infinite;
  }
`

export default function (): React.ReactElement {
  return (
    <SiteMeta
      url="/"
      robots="index,follow"
      title="GreenOn Software"
      type="website"
      description="We do everything to provide programming knowledge in a short, user-friendly form. It allows you to walk away from your computer faster and reduce your carbon footprint."
    >
      <Layout>
        <Section jumbo>
          <Container>
            <AnimatedDot />
            <XXL>
              <span>Green</span> is a nice color
            </XXL>
            <M>
              We do everything to provide programming knowledge in a short,
              user-friendly form. It allows you to walk away from your computer
              faster and reduce your carbon footprint.
            </M>
            <Link to="/articles/">
              <Button>CHECK ARTICLES</Button>
            </Link>
          </Container>
          {/* <GraphSvg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 672.679 786.937"
          >
            <g transform="translate(9348.524 11414.65)">
              <line
                x2="933.882"
                transform="translate(-8714.26 -11376.235) rotate(130)"
                fill="none"
                stroke="#fff"
                strokeMiterlimit="10"
                strokeWidth="3"
              />
              <path
                d="M0,81.244s44.658,6.2,21.53-41.714S84.28.684,84.28.684"
                transform="translate(-8705.341 -11260.448) rotate(130)"
                fill="none"
                stroke="#fff"
                strokeMiterlimit="10"
                strokeWidth="3"
              />
              <path
                d="M0,.26S44.658-5.925,21.529,41.99,84.28,80.835,84.28,80.835"
                transform="translate(-8958.559 -11084.663) rotate(130)"
                fill="none"
                stroke="#fff"
                strokeMiterlimit="10"
                strokeWidth="3"
              />
              <path
                d="M84.28.26S39.608-5.925,62.751,41.99,0,80.835,0,80.835"
                transform="translate(-9179.654 -10821.172) rotate(130)"
                fill="none"
                stroke="#fff"
                strokeMiterlimit="10"
                strokeWidth="3"
              />
              <line
                x1="246.417"
                transform="translate(-9083.173 -11061.888) rotate(130)"
                fill="none"
                stroke="#fff"
                strokeMiterlimit="10"
                strokeWidth="3"
              />
              <circle
                cx="27.267"
                cy="27.267"
                r="27.267"
                transform="translate(-8675.846 -11379.597) rotate(130)"
              />
              <circle
                cx="27.267"
                cy="27.267"
                r="27.267"
                transform="translate(-8721.625 -11199.082) rotate(130)"
              />
              <circle
                cx="27.267"
                cy="27.267"
                r="27.267"
                transform="translate(-8783.646 -11251.124) rotate(130)"
              />
              <circle
                cx="27.267"
                cy="27.267"
                r="27.267"
                transform="translate(-8853.216 -11168.215) rotate(130)"
              />
              <circle
                cx="27.267"
                cy="27.267"
                r="27.267"
                transform="translate(-9036.21 -11074.81) rotate(130)"
              />
              <circle
                cx="27.267"
                cy="27.267"
                r="27.267"
                transform="translate(-9128.098 -10965.302) rotate(130)"
              />
              <circle
                cx="27.267"
                cy="27.267"
                r="27.267"
                transform="translate(-9061.913 -10919.499) rotate(130)"
              />
              <circle
                cx="27.267"
                cy="27.267"
                r="27.267"
                transform="translate(-9185.877 -10771.764) rotate(130)"
              />
              <circle
                cx="27.267"
                cy="27.267"
                r="27.267"
                transform="translate(-9271.696 -10669.489) rotate(130)"
              />
            </g>
          </GraphSvg> */}
        </Section>
      </Layout>
    </SiteMeta>
  )
}
