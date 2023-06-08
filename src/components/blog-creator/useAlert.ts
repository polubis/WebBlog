import { useLocation, globalHistory, useNavigate } from "@reach/router"
import { useEffect } from "react"

const useAlert = (payload: {
  pathname: string
  text: string
  trigger?: boolean
}) => {
  const curLocation = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    return globalHistory.listen(({ action, location }) => {
      if (
        payload.trigger &&
        (action === "POP" ||
          (action === "PUSH" && !location.pathname.includes(payload.pathname)))
      ) {
        if (!window.confirm(payload.text)) {
          navigate(`${curLocation.pathname}`)
          return
        }
      }
    })
  })
}

export { useAlert }
