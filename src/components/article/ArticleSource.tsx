import React, { ReactNode } from "react"
import { Modal } from "../../ui"
import styled from "styled-components"
import theme from "../../utils/theme"

type ArticleSourceProps = {
  source: ReactNode
  onClose?: () => void
}

const Container = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  color: ${theme.secondary};
`

const ArticleSource = ({ source, onClose }: ArticleSourceProps) => {
  return (
    <Modal onClose={onClose}>
      <Container>{source}</Container>
    </Modal>
  )
}
export type { ArticleSourceProps }
export { ArticleSource }
