import React from "react"
import { B, M, Modal, XL } from "../../ui"
import Button from "../../components/button/Button"
import styled from "styled-components"

interface ConfirmationProps {
  onClose: () => void
  onConfirm: () => void
}

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;

  & > *:not(:last-child) {
    margin-right: 12px;
  }
`

const Container = styled.div`
  max-width: 380px;

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

const Confirmation = ({ onClose, onConfirm }: ConfirmationProps) => {
  return (
    <Modal onClose={onClose}>
      <Container>
        <XL>You want to delete snippet frame</XL>
        <M>
          Deleting a frame <B>does not modify</B> the one stored in the database. Don't
          be afraid :). We had to display this message.
        </M>
        <M>Are you sure that's what you want?</M>
        <Footer>
          <Button onClick={onClose}>No</Button>
          <Button onClick={onConfirm}>Yes</Button>
        </Footer>
      </Container>
    </Modal>
  )
}

export { Confirmation }
