import type { Image } from "./Image"
import type { Project } from "./Project"

type AuthorPlatformRole = "content-creator" | "contributor"

interface AuthorJSON {
  id: string
  name: string
  firstName: string
  lastName: string
  role: string
  bio: string
  githubURL?: string
  linkedinURL?: string
  platformRoles: [AuthorPlatformRole] | [AuthorPlatformRole, AuthorPlatformRole]
  projects: Project[]
}

interface Author extends AuthorJSON {
  avatar: Image
}

export type { AuthorJSON, Author }
