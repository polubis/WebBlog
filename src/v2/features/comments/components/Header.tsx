import React from "react"
import styled from "styled-components"
import { CloseIcon, XL } from "../../../../ui"
import type { HeaderProps } from "./models"

const Container = styled.div`
  justify-content: space-between;

  ${XL} {
    padding-right: 8px;
  }
`

export const Header = ({ text, onClose }: HeaderProps) => {
  return (
    <Container className="row">
      <XL>{text}</XL>
      <button
        type="button"
        className="icon-button secondary small"
        onClick={onClose}
      >
        <span>
          <CloseIcon />
        </span>
      </button>
    </Container>
  )
}
