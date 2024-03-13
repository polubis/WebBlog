import React from "react"
import { B, CloseIcon, M, Modal, X } from "../../../../ui"
import styled from "styled-components"

const Container = styled.div`
  ${M} {
    margin-bottom: 4px;
  }

  ${X} {
    position: relative;
    margin-bottom: 12px;
    padding-right: 80px;

    button {
      position: absolute;
      top: -8px;
      right: -8px;
    }
  }
`

interface ContactModalProps {
  onClose(): void
}

const ContactModal = ({ onClose }: ContactModalProps) => {
  return (
    <Modal maxWidth="440px" onClose={onClose}>
      <Container>
        <X>
          Contact us{" "}
          <button className="icon-button secondary small" onClick={onClose}>
            <CloseIcon />
          </button>
        </X>
        <M>
          To participate in our mentoring program, please{" "}
          <B>send us an email</B>.
        </M>
        <M>
          Address: <B>greenonsoftware@gmail.com</B>
        </M>
      </Container>
    </Modal>
  )
}

export { ContactModal }
