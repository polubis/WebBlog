import React, { ReactNode } from "react"
import styled from "styled-components"
import { XL } from "../../ui"
import { L_DOWN, M_DOWN } from "../../utils/viewport"
import Badge from "../article/Badge"
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

interface BlogCreatorHeadingProps {
  buttons: ReactNode;
  submitTrigger: ReactNode;
}

const BlogCreatorHeading = ({ buttons, submitTrigger }: BlogCreatorHeadingProps) => {
  return (
    <Heading className="components-blog-creator-heading">
      <XL>Article preview</XL>
      <Badge color={theme.green}>version 1.0</Badge>
      <Container>
        {buttons}
        {submitTrigger}
      </Container>
    </Heading>
  )
}

export { BlogCreatorHeading }
