import React, { ReactElement, useEffect } from "react"

import { IdleView } from "./IdleView"
import Button from "../../components/button/Button"
import { useSnippetCreator } from "./useSnippetCreator"
import { SnippetForm } from "./SnippetForm"
import { Sandbox } from "./Sandbox"
import { CreateSnippetForm } from "./CreateSnippetForm"
import { useSnippetGet } from "./useSnippetGet"
import { FullScreenAnimation } from "../../components/full-screen-animation"
import { Center } from "./Center"
import { Percentage } from "../../ui"
import { SnippetsErrorScreen } from "./SnippetsErrorScreen"
import { LoadedSnippetView } from "./LoadedSnippetView"
import { DraftEditButton, EditButton } from "./Buttons"
import { useKeyPress } from "../../utils/useKeyPress"

interface SnippetCreatorProps {
  layout: (children: ReactElement) => ReactElement
}

const SnippetCreator = ({ layout }: SnippetCreatorProps) => {
  const [state, action] = useSnippetCreator()

  const [id, loadState, startLoad] = useSnippetGet()

  useEffect(startLoad, [])

  useKeyPress({
    onKeyPress: e => {
      const actions = {
        e: () => {
          if (
            state.view === "idle" &&
            id !== null &&
            loadState.type === "done"
          ) {
            action.startEditFetchedSnippet(loadState.data)
          }
        },
      }

      actions[e.key.toLowerCase()]?.()
    },
  })

  const idleView = layout(
    <IdleView footer={<Button onClick={action.goToSandbox}>START</Button>} />
  )

  if (state.view === "idle") {
    if (id !== null) {
      return (
        <>
          {(loadState.type === "idle" || loadState.type === "pending") && (
            <FullScreenAnimation>
              <Center>
                <Percentage />
              </Center>
            </FullScreenAnimation>
          )}

          {loadState.type === "fail" && (
            <SnippetsErrorScreen onClick={action.goToSandbox} />
          )}

          {loadState.type === "done" &&
            layout(
              <LoadedSnippetView
                snippet={loadState.data}
                footer={
                  <DraftEditButton
                    onClick={() =>
                      action.startEditFetchedSnippet(loadState.data)
                    }
                  />
                }
              />
            )}
        </>
      )
    } else {
      return idleView
    }
  }

  if (state.view === "sandbox") {
    return (
      <Sandbox
        state={state}
        action={action}
        loadedSnippet={loadState.type === "done" ? loadState.data : undefined}
      />
    )
  }

  if (state.view === "add") {
    return (
      <SnippetForm
        header="Add new frame"
        onClose={action.closeForm}
        onSubmit={action.confirmAdd}
        initialMdx={state.code}
      />
    )
  }

  if (state.view === "edit") {
    return (
      <SnippetForm
        header="You are editing frame"
        onClose={action.closeForm}
        onSubmit={action.confirmEdit}
        initialMdx={state.code}
      />
    )
  }

  if (state.view === "submit") {
    return <CreateSnippetForm frames={state.frames} onBack={action.closeForm} />
  }

  throw Error("Something went wrong with routing")
}

export { SnippetCreator }
