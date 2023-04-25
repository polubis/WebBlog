import React from "react"
import styled from "styled-components"
import { XL } from "../../ui"
import { M_DOWN } from "../../utils/viewport"
import Badge from "../article/Badge"
import Button from "../button/Button"
import { useJoinUsModal } from "../article/WithJoinUsModal"
import theme from "../../utils/theme"

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

  & > :last-child {
    margin-left: auto;
  }
`

const ConnectedSubmitButton = () => {
  const ctx = useJoinUsModal()

  return <Button onClick={ctx.open}>SUBMIT ARTICLE</Button>
}

interface BlogCreatorHeadingProps {
  onFullModeClick: () => void
}

const BlogCreatorHeading = ({ onFullModeClick }: BlogCreatorHeadingProps) => {
  return (
    <Heading className="components-blog-creator-heading">
      <XL>Article preview</XL>
      <Badge color={theme.green}>beta</Badge>
      <Button onClick={onFullModeClick}>FULL MODE</Button>
      <ConnectedSubmitButton />
    </Heading>
  )
}

export { BlogCreatorHeading }
