import { Author } from "./Author"
import { Technology } from "./Technology"

export interface Material {
  title: string
  description: string
  author: Author
  stack: Technology[]
  path: string
  slug: string
  body: string
  createdAt: string
  modifiedAt: string
  gaPage: string
}
