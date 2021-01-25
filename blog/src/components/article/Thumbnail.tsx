import React from "react"
import styled from "styled-components"

import { XXL } from "./Text"

const Thumbnail = styled.header`
  width: 100%;
  min-height: 182px;
  padding: 24px;
  box-sizing: border-box;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  position: relative;
  background-size: cover;
  background-repeat: no-repeat;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.39);
    z-index: 0;
  }

  ${XXL} {
    text-shadow: 0 3px 6px rgba(0, 0, 0, 0.39);
    z-index: 1;
  }
`

interface Props {
  title: string
  src: string
}

export default function ({ src, title }: Props): React.ReactElement {
  return (
    <Thumbnail style={{ backgroundImage: `url(${src})` }}>
      <XXL>{title}</XXL>
    </Thumbnail>
  )
}
