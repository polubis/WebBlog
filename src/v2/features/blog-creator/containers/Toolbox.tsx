import React from "react"
import { LinkPopover } from "./LinkPopover"
import { ImagePopover } from "./ImagePopover"
import { CodePopover } from "./CodePopover"
import { TemplatesPopover } from "./TemplatesPopover"
import { MarkdownFormatter } from "./MarkdownFormatter"
import Divider from "../../../../components/divider/Divider"
import type { ToolboxProps } from "./models"
import styled from "styled-components"

const Container = styled.div`
  overflow-x: auto;

  path {
    fill: #000;
  }

  & > *:not(:last-child) {
    margin-right: 12px;
  }
`

const Toolbox = (props: ToolboxProps) => {
  return (
    <Container className="row">
      <LinkPopover />
      <ImagePopover />
      <CodePopover />
      <TemplatesPopover />
      <Divider />
      <MarkdownFormatter {...props} />
    </Container>
  )
}

export { Toolbox }
