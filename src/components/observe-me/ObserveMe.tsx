import React, { ReactNode } from "react"
import { Author } from "../../models"
import styled from "styled-components"
import { A, M, XL } from "../../ui"
import Button from "../button/Button"

interface ObserveMeProps {
  author: Author
  header: ReactNode
  description: ReactNode
  btnTitle: ReactNode
}

const Container = styled.div`
  background: #272727;
  padding: 28px;
  border-radius: 4px;
  max-width: 700px;
  width: calc(100% + 40px);
  transform: translateX(-20px);

  ${M} {
    margin: 12px 0 24px 0;
  }
`

const ObserveMe = ({
  author,
  header,
  description,
  btnTitle,
}: ObserveMeProps) => {
  return (
    <Container className="observe-me">
      <XL>{header}</XL>
      <M>{description}</M>
      <A
        href={author.linkedinURL!}
        title={author.firstName + " " + author.lastName}
        outside
      >
        <Button>{btnTitle}</Button>
      </A>
    </Container>
  )
}

export { ObserveMe }
