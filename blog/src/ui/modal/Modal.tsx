import React, { ReactNode, useState } from "react"
import styled from "styled-components"
import theme from "../../utils/theme"
import { usePortal } from "../../utils/usePortal"

export interface ModalProps {
  children: ReactNode
  onClose?: () => void
}

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${theme.backdrop};
  z-index: 200;
`

const Content = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  min-width: 280px;
  min-height: 280px;
  padding: 24px;
  transform: translate(-50%, -50%);
  background: ${theme.black};
  border-radius: 4px;
  z-index: 201;
  border: 1px solid ${theme.bg2};
  overflow-y: auto;
  max-height: 96vh;
`

export const Modal = ({ children, onClose }: ModalProps) => {
  const { render } = usePortal()

  return render(
    <>
      <Backdrop onClick={onClose} />
      <Content>{children}</Content>
    </>
  )
}

export const useModal = (initialOpen = false) => {
  const [isOpen, setIsOpen] = useState(initialOpen)

  const open = (): void => {
    setIsOpen(true)
  }

  const close = (): void => {
    setIsOpen(false)
  }

  const toggle = (): void => {
    setIsOpen(prev => !prev)
  }

  return { isOpen, open, close, toggle }
}
