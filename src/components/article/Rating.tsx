import React, { useState } from "react"
import styled from "styled-components"
import { XL } from "../../ui"
import Button from "../button/Button"
import Divider from "./Divider"

const Section = styled.section`
  display: flex;
  flex-flow: column;

  ${XL} {
    margin-top: 48px;
  }
`

interface Comment {
  id: string | number
  articleId: string
  content: string
  author: string
}

export const Rating = () => {
  return (
    <Section>
      <Divider />
      <XL>Rating</XL>
      <Button>+1</Button>
      <Button>-1</Button>
    </Section>
  )
}
