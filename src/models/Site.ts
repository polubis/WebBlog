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
}

interface Site {
  siteMetadata: SiteMetadata
}

type SupportedLang = "en" | "pl"
type SupportedLangHTML = "en-US" | "pl-PL"

type SiteName = "GreenOn Software"

export type {
  SiteMetadata,
  Site,
  LangKey,
  Lang,
  SupportedLangHTML,
  SiteName,
  SupportedLang,
}
