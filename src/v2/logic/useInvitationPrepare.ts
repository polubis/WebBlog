import { useState } from "react"

type Idle = { is: "idle" }
type Busy = { is: "busy" }
type Ok = {
  is: "ok"
  invitations: Invitations
}
type Fail = { is: "fail"; error: unknown }

type State = Idle | Busy | Ok | Fail

interface InvitationData {
  title: string
  description: string
  time: number
  link: string
  tags: string[]
  stack: string[]
  level: string
}

export interface LoadInvtationsPayload extends InvitationData {
  url: string
}

export const invitations = ["LinkedIn", "Facebook"] as const

type InvitationType = typeof invitations[number]

export type Invitations = Record<InvitationType, string>

const convertGithubPathToRaw = (url: string): string => {
  const [, , , ...path] = url.replace("/tree/", "/").split("/")
  return `https://raw.githubusercontent.com/${path.join("/")}`
}

const createTemplate = (content: string, data: InvitationData): string => {
  return [
    `🔍 ${(" " + data.title).replace(/ /g, " #")}`,
    "\n",
    "1. What do we explore? 🚀",
    data.description,
    "\n",
    "2. For whom is this article? 👩‍💻",
    `#${data.level}-#level developers welcome!`,
    "\n",
    "3. How much time will it take to read it? ⏱️",
    `Only ⏱️ #${data.time} #minutes of your time.`,
    "\n",
    "Check it out here: 👉",
    data.link,
    "\n",
    data.tags.map(item => "#" + item).join(" "),
    data.stack.map(item => "#" + item).join(" "),
  ].join("\n")
}

const parseInvitations = async (
  content: string,
  data: LoadInvtationsPayload
): Promise<Invitations> => {
  const invitations: Invitations = {
    LinkedIn: createTemplate(content, data),
    Facebook: createTemplate(content, data),
  }

  return Promise.resolve(invitations)
}

const getInvitations = async (
  payload: LoadInvtationsPayload
): Promise<Invitations> => {
  try {
    const response = await fetch(convertGithubPathToRaw(payload.url))
    const content = await response.text()
    const invitations = await parseInvitations(content, payload)

    return invitations
  } catch (error: unknown) {
    return Promise.reject(error)
  }
}

const useInvitationPrepare = () => {
  const [state, setState] = useState<State>({ is: "idle" })

  const load = async (payload: LoadInvtationsPayload): Promise<void> => {
    setState({ is: "busy" })

    try {
      const invitations = await getInvitations(payload)

      setState({
        is: "ok",
        invitations,
      })
    } catch (error: unknown) {
      setState({ is: "fail", error })
    }
  }

  const reset = (): void => {
    setState({ is: "idle" })
  }

  return [state, { load, reset }] as const
}

export { useInvitationPrepare }
