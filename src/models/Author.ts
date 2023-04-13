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
  projects?:
   [
    {
      tittle: string
      taskProject: string
      taskDescription: string
      startProject: string
      durationProject: string
      stack: string
      linkToProject: string
      linkToCodeTaskProject: string
    }
  ]
}

export interface Author extends AuthorJSON {
  avatar: Image
}
