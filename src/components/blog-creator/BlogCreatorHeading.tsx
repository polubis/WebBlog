import React, { ReactNode } from "react"
import styled from "styled-components"
import { XL } from "../../ui"
import { L_DOWN, M_DOWN } from "../../utils/viewport"
import Badge from "../article/Badge"
import Button from "../button/Button"
import { useJoinUsModal } from "../article/WithJoinUsModal"
import theme from "../../utils/theme"

const Container = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;

  & > *:not(:first-child) {
    margin-left: 20px;
  }
`

const Heading = styled.header`
  height: 100%;
  display: flex;
  flex-shrink: 0;
  align-items: center;

  ${XL} {
    margin-right: 10px;
  }

  @media ${M_DOWN} {
    ${XL} {
      display: none;
    }

    ${Badge} {
      display: none;
    }
  }

  .full-mode-btn {
    @media ${L_DOWN} {
      display: none;
    }
  }
`

const ConnectedSubmitButton = () => {
  const ctx = useJoinUsModal()

  return (
    <Button className="submit-article-btn" onClick={ctx.open}>
      SUBMIT ARTICLE
    </Button>
  )
}

interface BlogCreatorHeadingProps {
  buttons: ReactNode
}

const BlogCreatorHeading = ({ buttons }: BlogCreatorHeadingProps) => {
  return (
    <Heading className="components-blog-creator-heading">
      <XL>Article preview</XL>
      <Badge color={theme.green}>version 1.1</Badge>
      <Container>
        {buttons}
        <ConnectedSubmitButton />
      </Container>
    </Heading>
  )
}

export { BlogCreatorHeading }