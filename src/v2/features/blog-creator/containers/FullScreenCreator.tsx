import React, { ReactNode } from "react"
import styled from "styled-components"
import { BlogCreatorHeading } from "./BlogCreatorHeading"
import theme from "../../../../utils/theme"
import { usePortal } from "../../../../utils/usePortal"
import { useLayoutProvider } from "../../../providers/LayoutProvider"

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 98px 1fr 70px;
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
  border-bottom: 2px solid ${theme.grayC};
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
            <>
              <button
                className="full-mode-btn button secondary upper"
                onClick={onClose}
              >
                {layout.t.back}
              </button>
              {/* <button className="full-mode-btn button primary upper">
                Tutorial
              </button> */}
            </>
          }
        />
      </Header>
      <FirstWrapper>{First}</FirstWrapper>
      <ToolboxWrapper className="row">{Toolbox}</ToolboxWrapper>
      <SecondWrapper>{Second}</SecondWrapper>
    </Container>
  )
}

export { FullScreenCreator }
