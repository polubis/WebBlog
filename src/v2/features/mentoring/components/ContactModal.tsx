import React from "react"
import { CloseIcon, M, Modal, X } from "../../../../ui"
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
  title: React.ReactNode
  children: React.ReactNode
  onClose(): void
}

const ContactModal = ({ title, children, onClose }: ContactModalProps) => {
  return (
    <Modal maxWidth="440px" onClose={onClose}>
      <Container>
        <X>
          {title}{" "}
          <button className="icon-button secondary small" onClick={onClose}>
            <CloseIcon />
          </button>
        </X>
        {children}
      </Container>
    </Modal>
  )
}

export { ContactModal }
