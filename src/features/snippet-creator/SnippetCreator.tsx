import React, { useEffect } from "react"

import { useSnippetCreator } from "./useSnippetCreator"
import Loadable from "react-loadable"
import { IdleView } from "./IdleView"

const SnippetCreatorMainView = Loadable({
  loader: () =>
    import("./SnippetCreatorMainView").then(m => m.SnippetCreatorMainView),
  loading: () => null,
})

const SnippetCreator = () => {
  const [state, action] = useSnippetCreator()

  useEffect(SnippetCreatorMainView.preload, [])

  if (state.key === "idle" || state.key === "loading") {
    return <IdleView state={state} action={action} />
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
    return <SnippetCreatorMainView state={state} action={action} />
  }

  return <div>Something other happened... Please inform us on Linkedin</div>
}

export { SnippetCreator }
