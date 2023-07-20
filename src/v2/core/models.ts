import type { FixedObject, FluidObject } from "gatsby-image"

type Url = string
type Path = string

export interface MinimumArticle {
  title: string
  path: Path
  thumbnail: FixedObject
}

export interface Article {
  title: string
  path: string
  description: string
  thumbnail: FluidObject
  isNew: boolean
  readTime: number
  body: string
  source: Url
}
