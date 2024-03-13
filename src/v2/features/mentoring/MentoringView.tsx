import React from "react"
import Layout from "../../containers/Layout"
import styled from "styled-components"
import { Content, M, XL, XXL, CodeEditorTile, X, B } from "../../../ui"
import { Chart } from "./components/Chart"
import { Tile } from "./components/Tile"
import { MdxProvider } from "../../providers/MdxProvider"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { useToggle } from "../../utils/useToggle"
import { Modal } from "./components/Modal"
import { useMentoringPageProvider } from "./MentoringPageProvider"
import { useLayoutProvider } from "../../providers/LayoutProvider"
import { T_DOWN } from "../../../utils/viewport"

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-areas:
    "mentoring-first mentoring-first mentoring-second mentoring-second mentoring-second"
    "mentoring-third mentoring-third mentoring-third mentoring-fourth mentoring-fourth";
  gap: 20px;

  @media ${T_DOWN} {
    grid-template-columns: 1fr;
    grid-template-areas:
      "mentoring-first"
      "mentoring-second"
      "mentoring-third"
      "mentoring-fourth";
  }

  & > * {
    &:nth-child(1) {
      background: linear-gradient(to right, #333333, #2d2d2d, #252525);
      grid-area: mentoring-first;
    }

    &:nth-child(2) {
      background: linear-gradient(to right, #252525, #2d2d2d, #333333);
      grid-area: mentoring-second;
    }

    &:nth-child(3) {
      background: linear-gradient(to right, #333333, #2d2d2d, #252525);
      grid-area: mentoring-third;
    }

    &:nth-child(4) {
      background: linear-gradient(to right, #252525, #2d2d2d, #333333);
      grid-area: mentoring-fourth;
    }
  }
`

const Jumbo = styled.section`
  display: flex;
  flex-flow: column;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  padding: 40px 0;
  max-width: 640px;
  z-index: 1;

  & > * {
    text-align: center;
  }

  ${XXL} {
    margin-bottom: 20px;
  }

  ${M} {
    margin-bottom: 8px;
  }

  footer {
    margin-top: 24px;
  }
`

const Container = styled.div`
  z-index: 1;

  ${XL} {
    margin-bottom: 20px;
    text-shadow: 0 3px 6px rgba(0, 0, 0, 0.51);
  }
`

const MainContainer = styled.div`
  .ui-code-editor-tile {
    margin-bottom: 48px;
  }

  .ui-footer {
    z-index: 1;
  }
`

const MentoringView = () => {
  const mentoringModal = useToggle()
  const singleOfferModal = useToggle()
  const layout = useLayoutProvider()
  const mentoring = useMentoringPageProvider()

  return (
    <>
      {mentoringModal.opened && (
        <Modal title={mentoring.t.modal.title} onClose={mentoringModal.close}>
          <M>{mentoring.t.modal.description}</M>
          <M>
            <B>{layout.mail}</B>
          </M>
        </Modal>
      )}
      {singleOfferModal.opened && (
        <Modal title={mentoring.t.modal.title} onClose={singleOfferModal.close}>
          <M>{mentoring.t.modal.offer_description}</M>
          <M>
            <B>{layout.mail}</B>
          </M>
        </Modal>
      )}
      <MainContainer>
        <Chart />
        <Layout>
          <Content paddingY>
            <MdxProvider
              components={{
                Container,
                XXL,
                XL,
                X,
                Grid,
                BuyControl: ({ children }: { children: React.ReactNode }) => (
                  <Tile.Control onClick={singleOfferModal.open}>
                    {children}
                  </Tile.Control>
                ),
                Badge: Tile.Badge,
                Tile,
                CodeEditorTile,
                Jumbo,
                MentoringButton: ({
                  children,
                }: {
                  children: React.ReactNode
                }) => (
                  <button
                    className="button upper third"
                    onClick={mentoringModal.open}
                  >
                    {children}
                  </button>
                ),
                M,
              }}
              renderer={MDXRenderer}
            >
              {mentoring.content}
            </MdxProvider>
          </Content>
        </Layout>
      </MainContainer>
    </>
  )
}

export { MentoringView }
