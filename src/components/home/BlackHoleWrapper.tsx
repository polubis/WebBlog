import React, { forwardRef, useMemo } from "react"
import { useElementSize } from "../../utils/useElementSize"
import { BlackHole, BlackHoleProps } from "../black-hole/BlackHole"

const BlackHoleWrapper = forwardRef<HTMLDivElement | null, unknown>(
  (_, ref: any) => {
    const [state] = useElementSize({ ref })

    const props = useMemo((): BlackHoleProps & { key: string } => {
      const id = "hole"

      if (state.status === "undetected" || state.status === "unsupported") {
        return {
          id,
          key: "undetected",
          height: 0,
          width: 0,
          radius: 0,
        }
      }

      const { width } = state

      return {
        id,
        key: width.toString(),
        height: width,
        width: width,
        radius: 50,
      }
    }, [state])

    return <BlackHole {...props} />
  }
)

export { BlackHoleWrapper }
