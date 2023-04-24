import React, { ReactNode } from "react"
import styled from "styled-components"
import { usePortal } from "../../utils/usePortal"

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: red;
  z-index: 110;
`

const FirstWrapper = styled.div``

const SecondWrapper = styled.div``

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
