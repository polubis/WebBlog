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

export interface AuthorAvatar {
  aspectRatio: number
  base64: string
  sizes: string
  src: string
  srcSet: string
}

export interface Author {
  firstName: string
  lastName: string
  id: string
  role: string
  avatar: AuthorAvatar
}
