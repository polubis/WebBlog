interface ProjectBase {
  name: string
  description: string
  from: string
  stack: string[]
  appUrl?: string
  codeUrl?: string
  images: string[]
}

interface ActiveProject extends ProjectBase {
  status: "active"
}

interface FinishedProject extends ProjectBase {
  status: "finished"
  to: string
  duration: string
}

type Project = ActiveProject | FinishedProject

export type { Project }
