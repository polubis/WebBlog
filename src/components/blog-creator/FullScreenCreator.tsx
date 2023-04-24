import React, { ReactNode } from "react"
import styled from "styled-components"
import { usePortal } from "../../utils/usePortal"

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100vh;
  background: black;
  z-index: 110;
`

const FirstWrapper = styled.div`
  overflow-y: auto;
  height: 100%;
`

const SecondWrapper = styled.div`
  padding: 20px;
  overflow-y: auto;
  height: 100%;
`

interface FullScreenCreatorProps {
  children: [ReactNode, ReactNode]
  onClose?: () => void
}

const FullScreenCreator = ({ children, onClose }: FullScreenCreatorProps) => {
  const { render } = usePortal()

  const [First, Second] = children

  return render(
    <Container>
      <FirstWrapper>{First}</FirstWrapper>
      <SecondWrapper>{Second}</SecondWrapper>
    </Container>
  )
}

export { FullScreenCreator }
