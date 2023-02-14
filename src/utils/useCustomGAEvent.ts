import ReactGA from "react-ga4"
import { isProd } from "./isProd"

interface AuthorRequest {
  name: "author_request"
  payload: {
    email: string
    about: string
  }
}

type Event = AuthorRequest

export const useCustomGAEvent = () => {
  const track = (e: Event): void => {
    if (!isProd()) return

    ReactGA.initialize("G-NVC90KSB0J")
    ReactGA.event(e.name, {
      value: JSON.stringify(e.payload),
    })
  }

  return { track }
}
