import type { Routes } from "./Route"

type LangHTML = "en-US" | "pl-PL"
type LangKey = "en" | "pl"
interface Lang {
  html: LangHTML
  key: LangKey
}

interface SiteMetadata {
  siteUrl: string
  siteName: string
  siteDescription: string
  langs: Record<LangKey, Lang>
  routes: Routes
  discordUrl: string
}

interface Site {
  siteMetadata: SiteMetadata
}

export type { SiteMetadata, Site, LangKey, Lang }
