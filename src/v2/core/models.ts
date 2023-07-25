import type {
  FixedObject as GatsbyFixedObject,
  FluidObject,
} from "gatsby-image"
import type article_en from "../translation/article/en.json"
import type article_pl from "../translation/article/pl.json"
import type meta from "../core/meta.json"
import type layout_en from "../translation/layout/en.json"
import type layout_pl from "../translation/layout/pl.json"
import type authors_en from "../translation/authors/en.json"
import type authors_pl from "../translation/authors/pl.json"

type Id = string
type Title = string
type Name = string
type Path = string
type CDate = string
type Mdate = string
type Url = string
type Slug = string

export type FixedObject = GatsbyFixedObject & { originalName: string }

export interface MinimumArticle {
  title: Title
  path: Path
  thumbnail: FixedObject
}

export interface UserAvatar {
  tiny: FixedObject
  small: FixedObject
  medium: FixedObject
  big: FixedObject
}

export interface User {
  id: Id
  name: Name
  full_name: Name
  first_name: Name
  platform_roles: string[]
  role: string
  bio: string
  avatar: UserAvatar
  last_name: Name
  github_url?: Url
  linkedin_url?: Url
}

export type Meta = typeof meta
export type Lang = typeof meta["langs"]["en"] | typeof meta["langs"]["pl"]
export type LangKey = Lang["key"]
export type LayoutT = typeof layout_en | typeof layout_pl
export type ArticleT = typeof article_en | typeof article_pl
export type AuthorsT = typeof authors_en | typeof authors_pl

export interface ArticleThumbnail {
  full: FluidObject
  medium: FixedObject
}

export interface Layout extends Meta {
  lang: Lang
  lang_alternate: Lang
  t: LayoutT
  articles: MinimumArticle[]
}

export interface Technology {
  id: Id
  avatar: FixedObject
}

export enum Seniority {
  beginner = "🔰",
  intermediate = "⭐",
  advanced = "🌟",
  expert = "🥇",
}

export interface ArticlePageModel {
  title: Title
  description: string
  mdate: Mdate
  body: string
  ga_page: string
  path: string
  is_new: boolean
  read_time: number
  cdate: CDate
  source_url: Url
  url: Url
  slug: Slug
  translation_path?: string
  seniority: Seniority
  thumbnail: ArticleThumbnail
  lang: LangKey
  t: ArticleT
  author: Omit<User, "avatar"> & Pick<User["avatar"], "small" | "medium">
  tech_reviewer: Omit<User, "avatar"> & Pick<User["avatar"], "small">
  ling_reviewer: Omit<User, "avatar"> & Pick<User["avatar"], "small">
  tags: string
  technologies: Technology[]
  next?: MinimumArticle
  prev?: MinimumArticle
}

export interface AuthorsPageModel {
  t: AuthorsT
  ga_page: string
  url: string
  authors: (Omit<User, "avatar"> & { avatar: FixedObject })[]
}
