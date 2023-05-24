import type {
  AddState,
  EditState,
  InteractedState,
  LoadedState,
  SnippetCreatorState,
} from "./defs"

const isInteracted = (state: SnippetCreatorState): state is InteractedState => {
  return state.key === "interacted"
}

const isAddSnippet = (state: SnippetCreatorState): state is AddState => {
  return state.key === "add-snippet"
}

const isEditSnippet = (state: SnippetCreatorState): state is EditState => {
  return state.key === "edit"
}

const isLoadedState = (state: SnippetCreatorState): state is LoadedState => {
  return state.key === "loaded"
}

const isPrepared = (
  state: SnippetCreatorState
): state is LoadedState | InteractedState => {
  return isLoadedState(state) || isInteracted(state)
}

export { isInteracted, isAddSnippet, isEditSnippet, isLoadedState, isPrepared }
