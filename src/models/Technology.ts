import type { FixedObject } from "gatsby-image"

interface TechnologyFixedObject extends FixedObject {
  originalName: string
}

export interface Technology {
  id: string
  avatar: TechnologyFixedObject
}
