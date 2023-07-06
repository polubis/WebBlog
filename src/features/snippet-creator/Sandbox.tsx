import React from "react"
import { Banner, Code, XL, useModal } from "../../ui"
import styled from "styled-components"
import theme from "../../utils/theme"
import { useScrollToCurrentFrame } from "./useScrollToCurrentFrame"
import { SnippetCreatorAction, SnippetCreatorState } from "./defs"
import Badge from "../../components/article/Badge"
import { FramesProgress } from "./FramesProgress"
import {
  AddFrameButton,
  AutoPlayButton,
  CloseButton,
  DeleteFrameButton,
  EditButton,
  MenuButton,
  NextButton,
  PreviousButton,
  SubmitFramesButton,
} from "./Buttons"
import { T_DOWN, T_UP } from "../../utils/viewport"
import { Navigation } from "./Navigation"
import { useKeyPress } from "../../utils/useKeyPress"
import { useClickOutside } from "../../utils/useClickOutside"
import { MAX_FRAMES_COUNT, MIN_FRAMES_COUNT } from "./consts"
import { Confirmation } from "./Confirmation"
import { InteractiveButton } from "../../ui/snippet/InteractiveButton"
import { useClipboard } from "../../utils/useClipboard"
import { Snippet } from "../../models"

const Dot = styled.div`
  border-radius: 50%;
  width: 12px;
  height: 12px;
  background: ${theme.grayC};
`

const Container = styled.div`
  display: grid;
  grid-template-rows: auto;
  transition: 0.15s all ease-in-out;

  &.open {
    grid-template-columns: 260px 1fr;

    @media ${T_DOWN} {
      grid-template-columns: 100%;
    }

    .snippets-creator-code-header {
      @media ${T_UP} {
        width: calc(100% - 260px);
      }
    }
  }

  &.closed {
    grid-template-columns: 0px 1fr;

    @media ${T_DOWN} {
      grid-template-columns: 100%;
    }
  }

  .snippet-creator-btn svg path {
    fill: ${theme.black};
  }

  .snippets-creator-code-header {
    position: fixed;
    background: black;
    z-index: 10;
    padding: 20px;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transform: translateX(-20px);
    width: 100%;
    border-bottom: 1px solid ${theme.grayC};

    ${XL} {
      margin-right: 16px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      span {
        color: ${theme.primary};
      }
    }
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
      z-index: 11;
    }

    &.open {
      transform: translateX(0);
    }

    &.closed {
      transform: translateX(-260px);
    }

    .frames {
      padding: 20px;
      height: 100vh;
      overflow-y: auto;
      position: sticky;
      border-right: 1px solid ${theme.grayC};
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
          backdrop-filter: blur(1px);
          bottom: 0;
          display: none;
          justify-content: flex-end;
        }

        &:hover .panel {
          display: flex;
        }
      }
    }
  }

  .main-view-code {
    padding: 76px 20px 100px 20px;
    max-width: 100vw;

    .main-view-banner {
      margin-bottom: 20px;
    }

    .sandbox-code-footer {
      margin-top: 20px;
    }

    .editing-copy-of-snippet-banner {
      margin: 20px 0 12px 0;
      max-width: max-content;
      width: 100%;
    }
  }
`

interface SandboxProps {
  state: SnippetCreatorState
  action: SnippetCreatorAction
  loadedSnippet?: Snippet
}

const Sandbox = ({ state, action, loadedSnippet }: SandboxProps) => {
  const { ref } = useScrollToCurrentFrame<HTMLDivElement>(state)
  const isOpen = state.isNavigationPanelOpen
  const openClass = isOpen ? "open" : "closed"
  const confirmation = useModal()
  const { copy } = useClipboard()

  const { selectedFrame, frames, autoPlay } = state

  const handleClose = () => {
    confirmation.isOpen ? confirmation.close() : action.goToIdle()
  }

  useKeyPress({
    onKeyPress: e => {
      const actions = {
        a: () => {
          if (frames.length > MIN_FRAMES_COUNT) {
            action.goToPreviousFrame()
          }
        },
        d: () => {
          if (frames.length > MIN_FRAMES_COUNT) {
            action.goToNextFrame()
          }
        },
        p: () => {
          if (frames.length > MIN_FRAMES_COUNT) {
            action.toggleAutoPlay()
          }
        },
        n: action.startAdd,
        e: () => action.startEdit(selectedFrame!),
        r: () => {
          if (state.frames.length > MIN_FRAMES_COUNT) {
            confirmation.open()
          }
        },
        b: action.toggleNavigationPanel,
        s: action.startSubmit,
        escape: handleClose,
      }

      actions[e.key.toLowerCase()]?.()
    },
  })

  const { ref: headerRef } = useClickOutside<HTMLDivElement>({
    onOutside: () => {
      if (!confirmation.isOpen) {
        action.closeNavigationPanel()
      }
    },
  })

  const maxFramesExceeded = state.frames.length >= MAX_FRAMES_COUNT

  return (
    <>
      {autoPlay && (
        <FramesProgress frameId={selectedFrame!.id} frames={frames} />
      )}

      {confirmation.isOpen && (
        <Confirmation
          onClose={confirmation.close}
          onConfirm={() => {
            confirmation.close()
            action.removeFrame(selectedFrame!.id)
          }}
        />
      )}

      <Container className={openClass}>
        <div className={`snippets-creator-header ${openClass}`} ref={headerRef}>
          <div className="frames" ref={ref}>
            {state.frames.map((frame, idx) => (
              <div
                key={frame.id}
                className={`frame ${
                  frame.id === selectedFrame!.id ? "active" : ""
                }`}
                onClick={() => action.goToFrame(frame.id)}
              >
                <Code>{frame.code}</Code>
                <Badge
                  className="frame-badge"
                  background={theme.primary}
                  color={theme.bg}
                >
                  {idx + 1}
                </Badge>
                <div className="panel" />
              </div>
            ))}
          </div>
        </div>

        <div className="main-view-code">
          <div className="main-view-code-wrapper">
            {maxFramesExceeded && (
              <Banner className="main-view-banner">
                You can't add more frames. The maximum amount is{" "}
                {MAX_FRAMES_COUNT}. Delete a frame to add a new one.
              </Banner>
            )}

            {selectedFrame && (
              <Code
                animated
                header={
                  loadedSnippet ? (
                    <Banner className="editing-copy-of-snippet-banner">
                      You just created a snippet based on a snippet called{" "}
                      {loadedSnippet.name}. To save it permanently you must name
                      and describe your snippet.
                    </Banner>
                  ) : undefined
                }
                footer={
                  <footer className="sandbox-code-footer">
                    <InteractiveButton
                      onClick={() => copy(selectedFrame!.code)}
                    >
                      {status =>
                        status === "pending" ? <>✂️ Copied</> : <>✂️ Copy</>
                      }
                    </InteractiveButton>
                  </footer>
                }
              >
                {selectedFrame.code}
              </Code>
            )}

            <header className="snippets-creator-code-header">
              <XL>
                {loadedSnippet ? (
                  <>
                    Editing <span>{loadedSnippet.name}</span>
                  </>
                ) : (
                  "Create snippet"
                )}
              </XL>
              <CloseButton onClick={handleClose} />
            </header>

            <Navigation>
              <MenuButton
                open={isOpen}
                onClick={action.toggleNavigationPanel}
              />

              {state.frames.length > MIN_FRAMES_COUNT && (
                <>
                  <PreviousButton onClick={action.goToPreviousFrame} />
                  <NextButton onClick={action.goToNextFrame} />
                  <AutoPlayButton
                    playing={autoPlay}
                    onClick={action.toggleAutoPlay}
                  />
                </>
              )}

              <Dot />

              {state.frames.length > MIN_FRAMES_COUNT && (
                <DeleteFrameButton
                  onClick={e => {
                    e.stopPropagation()
                    confirmation.open()
                  }}
                />
              )}

              <EditButton
                onClick={e => {
                  e.stopPropagation()
                  action.startEdit(selectedFrame!)
                }}
              />

              <Dot />

              {maxFramesExceeded || (
                <AddFrameButton onClick={action.startAdd} />
              )}

              <SubmitFramesButton onClick={action.startSubmit} />
            </Navigation>
          </div>
        </div>
      </Container>
    </>
  )
}

export { Sandbox }
