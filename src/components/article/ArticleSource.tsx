import React from "react"
import { Modal } from "../../ui"
import styled from "styled-components"
import theme from "../../utils/theme"

type ArticleSourceProps = {
  body: string
  onClose?: () => void
}

const Container = styled.div`
  display: flex;
  flex-flow: column;
  padding: 24px;
  width: 100%;
  height: 100%;
  overflow: auto;
  color: ${theme.secondary};
`

const ArticleSource = ({ body, onClose }: ArticleSourceProps) => {
  console.log("body", body)
  return (
    <Modal onClose={onClose}>
      <Container>{body}</Container>
    </Modal>
  )
}

export type { ArticleSourceProps }
export { ArticleSource }
