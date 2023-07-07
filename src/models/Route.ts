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

type SupportedRoute =
  | "/"
  | "/articles/"
  | "/authors/"
  | "/courses/"
  | "/snippet-creator/"
  | "/blog-creator/"
type SupportedGAPages = "articles"

type SupportedExternalLink =
  | "https://discord.gg/PxXQayT3x3"
  | "https://www.facebook.com/groups/1472987149805006/"
  | "https://www.linkedin.com/in/adrian-po%C5%82ubi%C5%84ski-281ab2172/"

type Routes = Record<RouteKeys, Route>

export type {
  Route,
  RouteKeys,
  Routes,
  SupportedRoute,
  SupportedGAPages,
  SupportedExternalLink,
}
