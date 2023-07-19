import type { Project } from "./Project"
import type { FixedObject } from "gatsby-image"

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

interface AuthorAvatarFixedObject extends FixedObject {
  originalName: string
}

interface AuthorAvatar {
  tiny: {
    fixed: AuthorAvatarFixedObject
  }
  small: {
    fixed: AuthorAvatarFixedObject
  }
  medium: {
    fixed: AuthorAvatarFixedObject
  }
  big: {
    fixed: AuthorAvatarFixedObject
  }
}

interface Author extends AuthorJSON {
  avatar: AuthorAvatar
}

export type { AuthorJSON, Author, AuthorAvatar, AuthorAvatarFixedObject }
