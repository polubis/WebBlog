import React, { ReactElement, useEffect } from "react"
import { useKeyPress } from "../../../utils/useKeyPress"
import Button from "../../../components/button/Button"
import { Center } from "./components/Center"
import { Percentage } from "../../../ui"
import { IdleView } from "./containers/IdleVIew"
import { FullScreenAnimation } from "../../../components/full-screen-animation/FullScreenAnimation"
import { useSnippetCreator } from "./logic/useSnippetCreator"
import { useSnippetGet } from "./logic/useSnippetGet"
import { useSnippetCreatorPageProvider } from "./SnippetCreatorPageProvider"
import { DraftEditButton } from "./containers/Triggers"
import Loadable from "react-loadable"

const SnippetsErrorScreen = Loadable({
  loader: () =>
    import("./containers/SnippetsErrorScreen").then(m => m.SnippetsErrorScreen),
  loading: () => null,
})

const Sandbox = Loadable({
  loader: () => import("./containers/Sandbox").then(m => m.Sandbox),
  loading: () => null,
})

const CreateSnippetForm = Loadable({
  loader: () =>
    import("./containers/CreateSnippetForm").then(m => m.CreateSnippetForm),
  loading: () => null,
})

const SnippetForm = Loadable({
  loader: () => import("./containers/SnippetForm").then(m => m.SnippetForm),
  loading: () => null,
})

const LoadedSnippetView = Loadable({
  loader: () =>
    import("./components/LoadedSnippetView").then(m => m.LoadedSnippetView),
  loading: () => null,
})

interface SnippetCreatorProps {
  layout: (children: ReactElement) => ReactElement
}

const SnippetCreatorView = ({ layout }: SnippetCreatorProps) => {
  const [state, action] = useSnippetCreator()
  const creator = useSnippetCreatorPageProvider()

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
        header={creator.t.sandbox.add_new_frame}
        onClose={action.closeForm}
        onSubmit={action.confirmAdd}
        initialMdx={state.code}
      />
    )
  }

  if (state.view === "edit") {
    return (
      <SnippetForm
        header={creator.t.sandbox.editing.title}
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

export { SnippetCreatorView }
