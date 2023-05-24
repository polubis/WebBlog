import React, { useEffect } from "react"
import { Code, IconButton } from "../../ui"
import { useSnippetCreator } from "./useSnippetCreator"
import Button from "../../components/button/Button"
import styled from "styled-components"
import { SnippetCreatorHeader } from "./SnippetCreatorHeader"
import { SnippetCreatorFooter } from "./SnippetCreatorFooter"
import { SnippetForm } from "./SnippetForm"

const Container = styled.div`
  display: flex;
  flex-flow: column;
  position: relative;
  min-height: 100vh;

  pre {
    min-height: 500px;
  }
`

const SnippetCreator = () => {
  const [state, action] = useSnippetCreator()

  useEffect(action.start, [])

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
          header={
            <SnippetCreatorHeader scrollToActiveWhen={state.frames.length}>
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
                        onClick={e => {
                          e.stopPropagation()
                          action.startEdit(frame)
                        }}
                      >
                        E
                      </IconButton>
                      <IconButton
                        onClick={e => {
                          e.stopPropagation()
                          action.startDelete(frame)
                        }}
                      >
                        D
                      </IconButton>
                    </div>
                  </div>
                ))}
              </div>
            </SnippetCreatorHeader>
          }
          footer={
            <SnippetCreatorFooter>
              <Button onClick={() => action.move("prev")}>
                Previous frame
              </Button>
              <Button onClick={() => action.move("next")}>Next frame</Button>
              <Button onClick={action.startAdd}>Add new frame</Button>

              {(state.key === "interacted" || state.key === "loaded") && (
                <Button onClick={action.autoPlay}>
                  {state.autoPlay ? "Disable autoplay" : "Activate autoplay"}
                </Button>
              )}
            </SnippetCreatorFooter>
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
