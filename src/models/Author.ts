import type { Image } from "./Image"
import type { Project } from "./Project"

interface AuthorJSON {
  id: string
  name: string
  firstName: string
  lastName: string
  isAuthor: boolean
  isContributor: boolean
  role: string
  bio: string
  githubURL?: string
  linkedinURL?: string
  projects: Project[]
}

interface Author extends AuthorJSON {
  avatar: Image
}

export type { AuthorJSON, Author }
