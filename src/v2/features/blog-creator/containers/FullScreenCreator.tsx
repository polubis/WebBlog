import React, { ReactNode } from "react"
import styled from "styled-components"
import { BlogCreatorHeading } from "./BlogCreatorHeading"
import theme from "../../../../utils/theme"
import { usePortal } from "../../../../utils/usePortal"
import Button from "../../../../components/button/Button"
import { useLayoutProvider } from "../../../providers/LayoutProvider"

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 99px 1fr 70px;
  grid-template-areas: "header header" "first second" "toolbox second";
  gap: 0 24px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100vh;
  background: ${theme.black};
  z-index: 130;
`

const Header = styled.header`
  padding: 0 20px;
  grid-area: header;
  border-bottom: 1px solid ${theme.grayC};
  background: ${theme.bg};
`

const ToolboxWrapper = styled.div`
  padding: 0 20px;
  grid-area: toolbox;
`

const FirstWrapper = styled.div`
  overflow-y: auto;
  height: 100%;
  grid-area: first;
`

const SecondWrapper = styled.div`
  padding: 40px 20px 20px 20px;
  overflow-y: auto;
  height: 100%;
  grid-area: second;
`

interface FullScreenCreatorProps {
  children: [ReactNode, ReactNode, ReactNode]
  onClose: () => void
}

const FullScreenCreator = ({ children, onClose }: FullScreenCreatorProps) => {
  const { render } = usePortal()
  const layout = useLayoutProvider()

  const [First, Second, Toolbox] = children

  return render(
    <Container>
      <Header>
        <BlogCreatorHeading
          buttons={
            <Button className="full-mode-btn" onClick={onClose}>
              {layout.t.back}
            </Button>
          }
        />
      </Header>
      <FirstWrapper>
        {First}
      </FirstWrapper>
      <ToolboxWrapper className="row">
        {Toolbox}
      </ToolboxWrapper>
      <SecondWrapper>{Second}</SecondWrapper>
    </Container>
  )
}

export { FullScreenCreator }
