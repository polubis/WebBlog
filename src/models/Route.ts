type RouteKeys =
  | "articles"
  | "authors"
  | "courses"
  | "creator"
  | "home"
  | "snippetCreator"

interface Route {
  to: string
  gaPage: string
  key: RouteKeys
}

type Routes = Record<RouteKeys, Route>

export type { Route, RouteKeys, Routes }
