import React from "react"
import { FullScreenAnimation } from "../../components/full-screen-animation"
import { Code } from "../../ui"
import { FullScreenState, SnippetCreatorAction, SubmitState } from "./defs"
import styled from "styled-components"
import { FramesProgress } from "./FramesProgress"
import { CreateSnippetForm } from "./CreateSnippetForm"
import { CloseFullScreenButton, SubmitFramesButton } from "../../components/snippet-creator/Buttons"

interface SnippetCreatorPreviewViewProps {
  state: FullScreenState | SubmitState
  action: SnippetCreatorAction
}

const Container = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  justify-items: center;
`

const Toolbox = styled.div`
  display: flex;
  justify-content: space-between;
  position: absolute;
  top: 20px;
  left: 20px;
  right: 20px;

  .close-preview-view-btn {
    path {
      fill: black;
    }

    .letter {
      transform: translate(2.5px, 2.5px) scale(0.75);
    }
  }
`

const SnippetCreatorPreviewView = ({
  state,
  action,
}: SnippetCreatorPreviewViewProps) => {
  return (
    <FullScreenAnimation animated={false}>
      <Container>
        {state.key === "full-screen" && (
          <>
            <FramesProgress
              frameId={state.selectedFrame.id}
              frames={state.frames}
            />
            <Toolbox>
              <CloseFullScreenButton onClick={action.closeFullScreen} />
              <SubmitFramesButton onClick={action.startSubmit} />
            </Toolbox>

            <Code animated>{state.selectedFrame.code}</Code>
          </>
        )}
        {state.key === "submit" &&
          <CreateSnippetForm frames={state.frames} onBack={action.closeFullScreen} />
        }
      </Container>
    </FullScreenAnimation>
  )
}

export { SnippetCreatorPreviewView }
