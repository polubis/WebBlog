import { Image } from "./Image"

export interface AuthorJSON {
  id: string
  name: string
  firstName: string
  lastName: string
  role: string
  bio: string
  githubURL?: string
  linkedinURL?: string
}

export interface Author extends AuthorJSON {
  avatar: Image
}
