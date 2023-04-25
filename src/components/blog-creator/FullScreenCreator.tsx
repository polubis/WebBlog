import React, { ReactNode } from "react"
import styled from "styled-components"
import { usePortal } from "../../utils/usePortal"
import theme from "../../utils/theme"
import Button from "../button/Button"

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 99px 1fr;
  grid-template-areas: "header header" "first second";
  gap: 0 24px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100vh;
  background: ${theme.black};
  z-index: 110;
`

const Header = styled.header`
  display: flex;
  align-items: center;
  grid-area: header;
  border-bottom: 1px solid ${theme.grayC};
  background: ${theme.bg};
  padding: 0 20px;
`

const FirstWrapper = styled.div`
  overflow-y: auto;
  height: 100%;
  grid-area: first;
`

const SecondWrapper = styled.div`
  padding: 40px 20px  20px 20px;
  overflow-y: auto;
  height: 100%;
  grid-area: second;
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
      <Header>
        <Button onClick={onClose}>CLOSE</Button>
      </Header>
      <FirstWrapper>{First}</FirstWrapper>
      <SecondWrapper>{Second}</SecondWrapper>
    </Container>
  )
}

export { FullScreenCreator }
