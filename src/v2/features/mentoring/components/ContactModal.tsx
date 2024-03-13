import React from "react"
import { B, CloseIcon, M, Modal, X } from "../../../../ui"
import styled from "styled-components"
import { useToggle } from "../../../utils/useToggle"
import { useClipboard } from "../../../../utils/useClipboard"

const Container = styled.div`
  ${M} {
    margin-bottom: 4px;

    &.contact-modal-row {
      cursor: pointer;
      padding: 8px 12px;
      border-radius: 8px;

      &:first-of-type {
        margin-top: 28px;
      }

      &:hover {
        background: #161515;
      }
    }
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

  footer {
    margin-top: 40px;
    display: flex;

    & > * {
      margin-left: 12px;

      &:first-child {
        margin-left: auto;
      }
    }
  }
`

interface ContactModalProps {
  onClose(): void
}

const ContactModal = ({ onClose }: ContactModalProps) => {
  const content = useToggle()
  const clipboard = useClipboard()

  return (
    <Modal maxWidth="440px" onClose={onClose}>
      <Container>
        {content.opened && (
          <>
            <X>
              Email preview{" "}
              <button className="icon-button secondary small" onClick={onClose}>
                <CloseIcon />
              </button>
            </X>
            <M className="contact-modal-row">
              <B>Address:</B> greenonsoftware@gmail.com
            </M>
            <M className="contact-modal-row">
              <B>Subject:</B> Mentoring
            </M>
            <M className="contact-modal-row">
              <B>Content:</B> Good morning, I am interested in participating in{" "}
              your mentoring program. Could you please provide me with more
              information?
            </M>
            <footer>
              <button
                className="button upper secondary"
                onClick={content.close}
              >
                Back
              </button>
            </footer>
          </>
        )}
        {content.closed && (
          <>
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
              Click <B>Send</B> button, and copy content.
            </M>
            <footer>
              <button className="button upper third" onClick={content.open}>
                Send
              </button>
            </footer>
          </>
        )}
      </Container>
    </Modal>
  )
}

export { ContactModal }
