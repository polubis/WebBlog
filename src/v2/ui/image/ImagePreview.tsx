import React from "react"
import styled from "styled-components"
import { CloseIcon, IconButton, Modal, XL } from "../../../ui"
import { ImagePreviewProps } from "./models"

const Container = styled.div`
  img {
    border-radius: 4px;
  }

  .image-preview-header {
    margin-bottom: 20px;
    justify-content: space-between;

    button {
      path {
        fill: black;
      }
    }
  }
`

const ImagePreview = ({ title, src, alt, onClose }: ImagePreviewProps) => {
  return (
    <Modal onClose={onClose} maxWidth="98vw">
      <Container className="col">
        <div className="row image-preview-header">
          <XL>{title}</XL>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </div>
        <img src={src} alt={alt} />
      </Container>
    </Modal>
  )
}

export { ImagePreview }
