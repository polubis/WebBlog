import React from "react"
import { Code, Percentage, StopAutoPlayIcon } from "../../ui"
import styled, { keyframes } from "styled-components"
import { SnippetCreatorHeader } from "./SnippetCreatorHeader"
import { SnippetCreatorFooter } from "./SnippetCreatorFooter"
import { SnippetForm } from "./SnippetForm"
import theme from "../../utils/theme"
import { useScrollToCurrentFrame } from "./useScrollToCurrentFrame"
import {
  AddState,
  EditState,
  FullScreenOpeningState,
  InteractedState,
  LoadedState,
  SnippetCreatorAction,
} from "./defs"
import Badge from "../../components/article/Badge"

const rotate = keyframes`
    from {
      transform: rotate(0);
    }

    to {
      transform: rotate(360deg);
    }
`

const Container = styled.div`
  display: flex;
  flex-flow: column;
  padding: 20px;

  .snippet-creator-btn {
    position: relative;

    svg path {
      fill: ${theme.black};
    }
  }

  .auto-play-btn svg {
    animation: ${rotate} 3.5s ease-in-out infinite;
  }

  .add-btn {
    margin-left: auto;
  }
`

interface SnippetCreatorMainViewProps {
  state:
    | LoadedState
    | InteractedState
    | AddState
    | EditState
    | FullScreenOpeningState
  action: SnippetCreatorAction
}

import { useEffect } from "react"
import { FramesProgress } from "./FramesProgress"
import { FullScreenAnimation } from "../../components/full-screen-animation"
import { useScrollToTop } from "../../utils/useScrollToTop"
import {
  AddFrameButton,
  AutoPlayButton,
  DeleteFrameButton,
  EditButton,
  NextButton,
  OpenFullScreenButton,
  PreviousButton,
} from "../../components/snippet-creator/Buttons"
import { preserveCode } from "./utils"

const SnippetCreatorMainView = ({
  state,
  action,
}: SnippetCreatorMainViewProps) => {
  useScrollToTop()

  const { ref } = useScrollToCurrentFrame<HTMLDivElement>(state)

  useEffect(() => {
    if (state.key === "full-screen-opening") {
      const timeout = setTimeout(action.fullScreen, 1500)

      return () => {
        clearTimeout(timeout)
      }
    }
  }, [state])

  return (
    <>
      {(state.key === "interacted" || state.key === "loaded") &&
        state.autoPlay && (
          <FramesProgress
            frameId={state.selectedFrame.id}
            frames={state.frames}
          />
        )}

      {state.key === "full-screen-opening" && (
        <FullScreenAnimation>
          <Container>
            <Percentage />
          </Container>
        </FullScreenAnimation>
      )}

      <Container>
        <Code
          footer={
            <SnippetCreatorFooter>
              {state.frames.length > 1 && (
                <>
                  <PreviousButton onClick={() => action.move("prev")} />
                  <NextButton onClick={() => action.move("next")} />
                  {(state.key === "interacted" || state.key === "loaded") && (
                    <AutoPlayButton
                      className={state.autoPlay ? "auto-play-btn" : ""}
                      Icon={state.autoPlay ? StopAutoPlayIcon : undefined}
                      onClick={action.autoPlay}
                    />
                  )}
                </>
              )}

              <AddFrameButton onClick={action.startAdd} />

              {state.frames.length > 1 && (
                <OpenFullScreenButton onClick={action.fullScreenOpening} />
              )}
            </SnippetCreatorFooter>
          }
          header={
            <SnippetCreatorHeader>
              <div className="frames" ref={ref}>
                {state.frames.map((frame, idx) => (
                  <div
                    key={frame.id}
                    className={`frame ${
                      frame.id === state.selectedFrame.id ? "active" : ""
                    }`}
                    onClick={() => action.move("direct", frame.id)}
                  >
                    <Code>{preserveCode(frame.code, state.frames)}</Code>
                    <Badge
                      className="frame-badge"
                      background={theme.primary}
                      color={theme.bg}
                    >
                      {idx + 1}
                    </Badge>
                    <div className="panel">
                      <EditButton
                        onClick={e => {
                          e.stopPropagation()
                          action.startEdit(frame)
                        }}
                      />
                      {state.frames.length > 1 && (
                        <DeleteFrameButton
                          onClick={e => {
                            e.stopPropagation()
                            action.remove(frame)
                          }}
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </SnippetCreatorHeader>
          }
          animated={state.key === "interacted"}
        >
          {preserveCode(state.selectedFrame.code, state.frames)}
        </Code>

        {state.key === "add-snippet" && (
          <SnippetForm
            header="Add new frame"
            onClose={action.closeForm}
            onSubmit={action.confirmAdd}
            initialMdx={state.code}
          />
        )}

        {state.key === "edit" && (
          <SnippetForm
            header="You are editing frame"
            onClose={action.closeForm}
            onSubmit={action.confirmEdit}
            initialMdx={state.code}
          />
        )}
      </Container>
    </>
  )
}

export { SnippetCreatorMainView }
