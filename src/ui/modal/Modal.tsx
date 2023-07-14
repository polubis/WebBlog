import React, { ReactNode, useState } from "react"
import styled from "styled-components"
import theme from "../../utils/theme"
import { usePortal } from "../../utils/usePortal"
import { useKeyPress } from "../../utils/useKeyPress"

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
  padding: 24px;
  transform: translate(-50%, -50%);
  background: ${theme.black};
  border-radius: 4px;
  z-index: 201;
  border: 1px solid ${theme.bg2};
  overflow-y: auto;
  max-height: calc(100% - 40px);
  width: calc(100% - 40px);
  max-width: 700px;
`

export const Modal = ({ children, onClose }: ModalProps) => {
  useKeyPress({
    onKeyPress: e => {
      const actions = {
        Escape: onClose,
      }

      actions[e.key]?.()
    },
  })
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
