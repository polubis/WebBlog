import React from "react"
import { Link as GatsbyLink } from "gatsby"

import styled from "styled-components"

import theme from "../../utils/theme"

const Logo = styled.svg`
  flex-shrink: 0;
`

export default function () {
  return (
    <Logo
      xmlns="http://www.w3.org/2000/svg"
      width="93.28"
      height="54.371"
      viewBox="0 0 93.28 54.371"
    >
      <g transform="translate(-925.662 -36)">
        <g transform="translate(716 14.474)">
          <g transform="translate(22)">
            <g transform="translate(265.336 28.619) rotate(-90)">
              <ellipse
                cx="3"
                cy="2.5"
                rx="3"
                ry="2.5"
                transform="translate(-0.395 0.254)"
                fill={theme.primary}
              />
            </g>
            <g transform="translate(273.848 39.968) rotate(-90)">
              <circle
                cx="3"
                cy="3"
                r="3"
                transform="translate(-0.045 -0.258)"
                fill={theme.primary}
              />
            </g>
            <g transform="translate(208.59 74.015) rotate(-90)">
              <path
                d="M33.051,52.17l-2.582-2.582,1.66-3.334a22.217,22.217,0,0,1-2.61-6.27L26,38.792V30.28l3.518-1.192a22.217,22.217,0,0,1,2.61-6.27l-1.66-3.334,6.015-6.015,3.334,1.66a22.785,22.785,0,0,1,6.27-2.61L47.28,9h8.512l1.192,3.518a22.217,22.217,0,0,1,6.27,2.61l3.334-1.66L72.6,19.484l-1.66,3.334a22.217,22.217,0,0,1,2.61,6.27l3.518,1.192v8.512l-3.518,1.192a22.217,22.217,0,0,1-2.61,6.27l1.66,3.334L66.588,55.6l-3.334-1.66a22.217,22.217,0,0,1-6.27,2.61l-1.192,3.518H47.28l-1.192-3.518a22.217,22.217,0,0,1-6.27-2.61L36.484,55.6Z"
                transform="translate(-26 -9)"
                fill={theme.primary}
              />
            </g>
            <path
              d="M43,34.349h8.512V23H43Zm2.837-8.512h2.837v5.675H45.837Z"
              transform="translate(205.451 92.898) rotate(-90)"
            />
            <path
              d="M51,23h2.837V37H51Z"
              transform="translate(205.451 110.548) rotate(-90)"
            />
            <path
              d="M55.768,56.512a4.25,4.25,0,0,0-3.995,2.837H45.837V48H43V62.187h8.773a4.249,4.249,0,1,0,3.995-5.675Zm0,5.675a1.419,1.419,0,1,1,1.419-1.419A1.42,1.42,0,0,1,55.768,62.187Z"
              transform="translate(215.918 92.898) rotate(-90)"
              fill={theme.secondary}
            />
            <path
              d="M64.187,49.256a4.25,4.25,0,0,0-3.995,2.837H52.837V45H50v9.931H60.192a4.249,4.249,0,1,0,3.995-5.675Zm0,5.675a1.419,1.419,0,1,1,1.419-1.419A1.42,1.42,0,0,1,64.187,54.931Z"
              transform="translate(214.662 89.968) rotate(-90)"
              fill={theme.secondary}
            />
            <g transform="translate(203.268 68.804) rotate(90)">
              <ellipse
                cx="3"
                cy="2.5"
                rx="3"
                ry="2.5"
                transform="translate(-0.395 0.254)"
                fill={theme.primary}
              />
            </g>
            <g transform="translate(194.756 57.455) rotate(90)">
              <circle
                cx="3"
                cy="3"
                r="3"
                transform="translate(-0.045 -0.258)"
                fill={theme.primary}
              />
            </g>
            <path
              d="M55.768,56.512a4.25,4.25,0,0,0-3.995,2.837H45.837V48H43V62.187h8.773a4.249,4.249,0,1,0,3.995-5.675Zm0,5.675a1.419,1.419,0,1,1,1.419-1.419A1.42,1.42,0,0,1,55.768,62.187Z"
              transform="translate(252.686 4.525) rotate(90)"
              fill={theme.secondary}
            />
            <path
              d="M64.187,49.256a4.25,4.25,0,0,0-3.995,2.837H52.837V45H50v9.931H60.192a4.249,4.249,0,1,0,3.995-5.675Zm0,5.675a1.419,1.419,0,1,1,1.419-1.419A1.42,1.42,0,0,1,64.187,54.931Z"
              transform="translate(253.941 7.455) rotate(90)"
              fill={theme.secondary}
            />
          </g>
        </g>
      </g>
    </Logo>
  )
}
