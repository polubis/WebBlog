import React from "react"
import { Code, Percentage } from "../../ui"
import styled from "styled-components"
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
import { useEffect } from "react"
import { FramesProgress } from "./FramesProgress"
import { FullScreenAnimation } from "../../components/full-screen-animation"
import { useScrollToTop } from "../../utils/useScrollToTop"
import {
  AddFrameButton,
  AutoPlayButton,
  DeleteFrameButton,
  EditButton,
  MenuButton,
  NextButton,
  OpenFullScreenButton,
  PreviousButton,
} from "../../components/snippet-creator/Buttons"
import { preserveCode } from "./utils"
import { T_DOWN } from "../../utils/viewport"
import { SnippetToolbox } from "../../components/snippet-toolbox/SnippetToolbox"
import { Navigation } from "./Navigation"

const Container = styled.div`
  display: grid;
  grid-template-rows: auto;
  transition: 0.15s all ease-in-out;

  &.open {
    grid-template-columns: 260px 1fr;

    @media ${T_DOWN} {
      grid-template-columns: 1fr;
    }
  }

  &.closed {
    grid-template-columns: 0px 1fr;

    @media ${T_DOWN} {
      grid-template-columns: 1fr;
    }
  }

  .snippet-creator-btn svg path {
    fill: ${theme.black};
  }

  .snippets-creator-header {
    position: relative;
    transition: 0.2s all ease-in-out;
    width: 260px;
    background: black;

    @media ${T_DOWN} {
      position: fixed;
      left: 0;
      top: 0;
      bottom: 0;
      z-index: 1;
    }

    &.open {
      transform: translateX(0);
    }

    &.closed {
      transform: translateX(-260px);
    }

    .menu-button {
      position: fixed;
      bottom: 12px;
      right: 28px;
    }

    .frames {
      padding: 20px;
      height: 100vh;
      overflow-y: auto;
      position: sticky;
      top: 0;

      .frame {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 160px;
        max-width: 280px;
        overflow: hidden;
        flex-shrink: 0;
        border: 2px solid transparent;

        &.active {
          border-color: ${theme.primary};
        }

        &:hover:not(.active) {
          border-color: transparent;
        }

        pre {
          transform: scale(0.4);
          overflow: hidden;
        }

        .frame-badge {
          position: absolute;
          top: 20px;
          right: 20px;
        }

        .panel {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          cursor: pointer;
          background: transparent;
          backdrop-filter: blur(5px);
          bottom: 0;
          display: none;
          justify-content: flex-end;
          padding: 16px;

          & > *:not(:last-child) {
            margin-right: 12px;
          }
        }

        &:hover .panel {
          display: flex;
        }
      }
    }
  }

  .main-view-code {
    padding: 20px 20px 80px 20px;
    max-width: 100vw;
  }
`

const Center = styled.div`
  padding: 40px 20px;
  display: flex;
  align-items: center;
  justify-items: center;
  height: 100%;

  & > * {
    margin: auto;
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

  const isOpen =
    (state.key === "interacted" || state.key === "loaded") &&
    state.isNavigationPanelOpen
  const openClass = isOpen ? "open" : "closed"

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
          <Center>
            <Percentage />
          </Center>
        </FullScreenAnimation>
      )}

      {(state.key === "interacted" || state.key === "loaded") && (
        <>
          <Container className={openClass}>
            <div className={`snippets-creator-header ${openClass}`}>
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
              {state.isNavigationPanelOpen && (
                <MenuButton
                  open={isOpen}
                  onClick={action.toggleNavigationPanel}
                />
              )}
            </div>

            <div className="main-view-code">
              <div className="main-view-code-wrapper">
                <Code animated>
                  {preserveCode(state.selectedFrame.code, state.frames)}
                </Code>

                <Navigation>
                  {state.frames.length > 1 && (
                    <>
                      <MenuButton
                        open={isOpen}
                        onClick={action.toggleNavigationPanel}
                      />
                      <PreviousButton onClick={() => action.move("prev")} />
                      <NextButton onClick={() => action.move("next")} />
                      {(state.key === "interacted" ||
                        state.key === "loaded") && (
                        <AutoPlayButton
                          playing={state.autoPlay}
                          onClick={action.autoPlay}
                        />
                      )}
                      <AddFrameButton onClick={action.startAdd} />
                      <OpenFullScreenButton
                        onClick={action.fullScreenOpening}
                      />
                    </>
                  )}
                </Navigation>
              </div>
            </div>
          </Container>
        </>
      )}

      {state.key === "add-snippet" && (
        <Center>
          <SnippetForm
            header="Add new frame"
            onClose={action.closeForm}
            onSubmit={action.confirmAdd}
            initialMdx={state.code}
          />
        </Center>
      )}

      {state.key === "edit" && (
        <Center>
          <SnippetForm
            header="You are editing frame"
            onClose={action.closeForm}
            onSubmit={action.confirmEdit}
            initialMdx={state.code}
          />
        </Center>
      )}
    </>
  )
}

export { SnippetCreatorMainView }
