import React, { useEffect, useLayoutEffect } from "react"
import {
  ArrowLeftIcon,
  AutoPlayIcon,
  Code,
  DeleteIcon,
  EditIcon,
  IconButton,
  PlusIcon,
  RightArrowIcon,
  StopAutoPlayIcon,
} from "../../ui"
import { useSnippetCreator } from "./useSnippetCreator"
import styled, { keyframes } from "styled-components"
import { SnippetCreatorHeader } from "./SnippetCreatorHeader"
import { SnippetCreatorFooter } from "./SnippetCreatorFooter"
import { SnippetForm } from "./SnippetForm"
import theme from "../../utils/theme"
import { useScrollTo } from "./useScrollTo"

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
  min-height: 100vh;

  pre {
    min-height: 500px;
  }

  .keyboard-letter {
    position: absolute;
    bottom: 2px;
    right: 2px;
    font-size: 10px;
  }

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

const SnippetCreator = () => {
  const { scroll } = useScrollTo({
    container: ".snippets .frames",
    node: ".frame.active",
  })
  const [state, action] = useSnippetCreator()

  useEffect(action.start, [])
  useLayoutEffect(() => {
    if (state.key === "interacted") {
      scroll()
    }
  }, [state])

  if (state.key === "idle") {
    return <div>Witaj na naszym kreatorze</div>
  }

  if (state.key === "loading") {
    return <div>Preparing...</div>
  }

  if (state.key === "failed") {
    return <div>Server error</div>
  }

  if (
    state.key === "loaded" ||
    state.key === "interacted" ||
    state.key === "add-snippet" ||
    state.key === "edit"
  ) {
    return (
      <Container>
        <Code
          footer={
            <SnippetCreatorFooter>
              {state.frames.length > 1 && (
                <>
                  <IconButton
                    className="snippet-creator-btn"
                    title="Go to previous"
                    onClick={() => action.move("prev")}
                  >
                    <ArrowLeftIcon />
                    <span className="keyboard-letter">A</span>
                  </IconButton>
                  <IconButton
                    className="snippet-creator-btn"
                    title="Go to next"
                    onClick={() => action.move("next")}
                  >
                    <RightArrowIcon />
                    <span className="keyboard-letter">D</span>
                  </IconButton>

                  {(state.key === "interacted" || state.key === "loaded") && (
                    <IconButton
                      className={`snippet-creator-btn ${
                        state.autoPlay ? "auto-play-btn" : ""
                      }`}
                      title="Start or stop auto play"
                      onClick={action.autoPlay}
                    >
                      {state.autoPlay ? <StopAutoPlayIcon /> : <AutoPlayIcon />}
                      <span className="keyboard-letter">P</span>
                    </IconButton>
                  )}
                </>
              )}

              <IconButton
                className="snippet-creator-btn add-btn"
                onClick={action.startAdd}
                title="Add snippet frame"
              >
                <PlusIcon />
                <span className="keyboard-letter">N</span>
              </IconButton>
            </SnippetCreatorFooter>
          }
          header={
            <SnippetCreatorHeader>
              <div className="frames">
                {state.frames.map(frame => (
                  <div
                    key={frame.id}
                    className={`frame ${
                      frame.id === state.selectedFrame.id ? "active" : ""
                    }`}
                    onClick={() => action.move("direct", frame.id)}
                  >
                    <Code>{frame.code}</Code>
                    <div className="panel">
                      <IconButton
                        title="Edit snippet frame"
                        onClick={e => {
                          e.stopPropagation()
                          action.startEdit(frame)
                        }}
                      >
                        <EditIcon />
                        <span className="keyboard-letter">E</span>
                      </IconButton>
                      {state.frames.length > 1 && (
                        <IconButton
                          title="Delete snippet frame"
                          onClick={e => {
                            e.stopPropagation()
                            action.remove(frame)
                          }}
                        >
                          <DeleteIcon />
                          <span className="keyboard-letter">R</span>
                        </IconButton>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </SnippetCreatorHeader>
          }
          animated={state.key === "interacted"}
        >
          {state.selectedFrame.code}
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
    )
  }

  return <div>Error...</div>
}

export { SnippetCreator }
