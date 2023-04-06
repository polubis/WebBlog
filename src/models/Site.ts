import type { Route } from "./Route"

type RouteKeys = "articles" | "authors" | "courses" | "creator" | "home"

interface SiteMetadata {
  siteUrl: string
  siteName: string
  siteDescription: string
  siteLang: string
  routes: Record<RouteKeys, Route>
}

interface Site {
  siteMetadata: SiteMetadata
}

export type { SiteMetadata, Site }
