import React from "react"
import { Code } from "../../ui"
import { FullScreenState, SnippetCreatorAction, SubmitState } from "./defs"
import styled from "styled-components"
import { FramesProgress } from "./FramesProgress"
import { CreateSnippetForm } from "./CreateSnippetForm"
import {
  AutoPlayButton,
  CloseFullScreenButton,
  NextButton,
  PreviousButton,
  SubmitFramesButton,
} from "../../components/snippet-creator/Buttons"
import { preserveCode } from "./utils"
import { SnippetToolbox } from "../../components/snippet-toolbox/SnippetToolbox"

interface SnippetCreatorPreviewViewProps {
  state: FullScreenState | SubmitState
  action: SnippetCreatorAction
}

const Container = styled.div`
  padding: 20px 20px 80px 20px;
  min-height: 100vh;
  max-width: 100vw;

  .create-snippet-form,
  .create-snippet-form-final-screen,
  .code-wrapper-creator-preview {
    margin: 0 auto;
  }
`

const SnippetCreatorPreviewView = ({
  state,
  action,
}: SnippetCreatorPreviewViewProps) => {
  return (
    <Container>
      {state.key === "full-screen" && (
        <>
          <FramesProgress
            frameId={state.selectedFrame.id}
            frames={state.frames}
          />
          <SnippetToolbox>
            <CloseFullScreenButton onClick={action.closeFullScreen} />
            <PreviousButton onClick={() => action.move("prev")} />
            <NextButton onClick={() => action.move("next")} />
            <AutoPlayButton
              playing={state.autoPlay}
              onClick={action.autoPlay}
            />
            <SubmitFramesButton onClick={action.startSubmit} />
          </SnippetToolbox>

          <div className="code-wrapper-creator-preview">
            <Code animated>
              {preserveCode(state.selectedFrame.code, state.frames)}
            </Code>
          </div>
        </>
      )}
      {state.key === "submit" && (
        <CreateSnippetForm
          frames={state.frames}
          onBack={action.closeFullScreen}
        />
      )}
    </Container>
  )
}

export { SnippetCreatorPreviewView }
