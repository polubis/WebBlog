import React from "react"
import { M, Modal, XL } from "../../../../ui"
import Button from "../../../../components/button/Button"
import styled from "styled-components"
import { useSnippetCreatorPageProvider } from "../SnippetCreatorPageProvider"
import { useLayoutProvider } from "../../../providers/LayoutProvider"
import type { ConfirmationProps } from "./models"

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;

  & > *:not(:last-child) {
    margin-right: 12px;
  }
`

const Container = styled.div`
  ${XL} {
    margin-bottom: 20px;
  }

  ${M} {
    & + ${M} {
      margin-top: 8px;
    }
  }

  ${Footer} {
    margin-top: 40px;
  }
`

const Confirmation = ({ onClose, onConfirm, children }: ConfirmationProps) => {
  const creator = useSnippetCreatorPageProvider()
  const layout = useLayoutProvider()

  return (
    <Modal maxWidth="400px" onClose={onClose}>
      <Container>
        <XL>{creator.t.sandbox.delete_confirm.title}</XL>
        {children}
        <M>{creator.t.sandbox.delete_confirm.message}</M>
        <Footer>
          <Button onClick={onClose}>{layout.t.no}</Button>
          <Button onClick={onConfirm}>{layout.t.yes}</Button>
        </Footer>
      </Container>
    </Modal>
  )
}

export { Confirmation }
