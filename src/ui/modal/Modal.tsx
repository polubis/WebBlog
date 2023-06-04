import React, { ReactNode, useState, useEffect } from "react"
import styled, { keyframes } from "styled-components"
import theme from "../../utils/theme"
import { usePortal } from "../../utils/usePortal"
import { useKeyPress } from "../../utils/useKeyPress"

export interface ModalProps {
  children: ReactNode
  onClose?: () => void
}

const slideIn = keyframes`
  from {
    transform: translate(-50%, -100%);
    opacity: 0;
  }
  to {
    transform: translate(-50%, -50%);
    opacity: 1;
  }
`

const slideOut = keyframes`
  from {
    transform: translate(-50%, -50%);
    opacity: 1;
  }
  to {
    transform: translate(-50%, -100%);
    opacity: 0;
  }
`

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${theme.backdrop};
  z-index: 200;
`

const Content = styled.div<{ isOpen: boolean }>`
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
  animation: ${({ isOpen }) => (isOpen ? slideIn : slideOut)} 0.3s ease-in-out;
`

export const Modal = ({ children, onClose }: ModalProps) => {
  useKeyPress({
    onKeyPress: (e) => {
      const actions = {
        Escape: onClose,
      }

      actions[e.key]?.()
    }
  })
  const { render } = usePortal()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setIsOpen(true)
  }, [])

  const handleBackdropClick = () => {
    setIsOpen(false)
  }

  const handleAnimationEnd = () => {
    if (!isOpen && onClose) {
      onClose()
    }
  }

  return render(
    <>
      <Backdrop onClick={handleBackdropClick} />
      <Content isOpen={isOpen} onAnimationEnd={handleAnimationEnd}>
        {children}
      </Content>
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
