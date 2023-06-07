import React, { useEffect, ReactElement } from "react"

import { useSnippetCreator } from "./useSnippetCreator"
import Loadable from "react-loadable"
import { IdleView } from "./IdleView"
import { SnippetCreatorPreviewView } from "./SnippetCreatorPreviewView"
import { SnippetsErrorScreen } from "../../components/snippets-error-screen/SnippetsErrorScreen"
import Button from "../../components/button/Button"

const SnippetCreatorMainView = Loadable({
  loader: () =>
    import("./SnippetCreatorMainView").then(m => m.SnippetCreatorMainView),
  loading: () => null,
})

interface SnippetCreatorProps {
  layout: (children: ReactElement) => ReactElement
}

const SnippetCreator = ({ layout }: SnippetCreatorProps) => {
  const [state, action] = useSnippetCreator()

  useEffect(() => {
    SnippetCreatorMainView.preload()
  }, [])

  if (state.key === "idle" || state.key === "loading") {
    return layout(<IdleView state={state} action={action} />)
  }

  if (state.key === "failed") {
    return (
      <SnippetsErrorScreen
        action={
          <Button onClick={() => window.location.replace("/snippet-creator/")}>
            GENERATE YOUR SNIPPET
          </Button>
        }
      />
    )
  }

  if (
    state.key === "loaded" ||
    state.key === "interacted" ||
    state.key === "add-snippet" ||
    state.key === "edit" ||
    state.key === "full-screen-opening"
  ) {
    return <SnippetCreatorMainView state={state} action={action} />
  }

  if (state.key === "full-screen" || state.key === "submit") {
    return <SnippetCreatorPreviewView state={state} action={action} />
  }

  throw Error("Something went wrong...")
}

export { SnippetCreator }
