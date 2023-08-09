import React from "react"

import styled from "styled-components"
import type { AvatarProps } from "./models"
import { X } from "../../ui"

const Container = styled.div`
  height: 32px;
  width: 32px;

  & > * {
    height: 100%;
    width: 100%;
  }

  div {
    background: black;
  }
`

export const Avatar = ({ src, alt }: AvatarProps) => {
  return (
    <Container className="avatar">
      {src ? (
        <img referrerPolicy="no-referrer" className="circle" src={src} alt={alt} />
      ) : (
        <div title={alt} className="center circle">
          <X>{alt.charAt(0)}</X>
        </div>
      )}
    </Container>
  )
}
