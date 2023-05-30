import React, { useEffect } from "react"

import { useSnippetCreator } from "./useSnippetCreator"
import { SnippetForm } from "./SnippetForm"
import Loadable from "react-loadable"

const SnippetCreatorMainView = Loadable({
  loader: () =>
    import("./SnippetCreatorMainView").then(m => m.SnippetCreatorMainView),
  loading: () => null,
})

const SnippetCreator = () => {
  const [state, action] = useSnippetCreator()

  useEffect(() => {
    SnippetCreatorMainView.preload()
    action.start()
  }, [])

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
      <>
        <SnippetCreatorMainView state={state} action={action} />

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
      </>
    )
  }

  return <div>Error...</div>
}

export { SnippetCreator }
