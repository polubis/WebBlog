import { Snippet } from "../../models"

interface Idle {
  key: "idle"
}

interface Loading {
  key: "loading"
}

interface Opening {
  key: "opening"
}

interface Loaded {
  key: "loaded"
  snippet: Snippet
}

interface Between {
  key: "between"
  snippet: Snippet
}

interface LoadFail {
  key: "load-fail"
  error: string
}

type SnippetPreviewState =
  | Idle
  | Loading
  | Opening
  | Loaded
  | LoadFail
  | Between

export {
  Idle,
  LoadFail,
  Loading,
  Opening,
  Loaded,
  Between,
  SnippetPreviewState,
}
