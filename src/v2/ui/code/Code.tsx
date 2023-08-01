import React, { memo, useMemo } from "react"
import Loadable from "react-loadable"
import type { CodeProps } from "./models"
import { pre_config } from "./consts"
import { useIsVisible } from "../../../utils/useIsVisible"
import { XL } from "../../../ui/text/Text"

const Code = memo((props: CodeProps) => {
  const { isVisible, ref } = useIsVisible({ threshold: 0.1, useOnce: true })
  const code = props.children.trim()
  const height =
    code.split("\n").length * pre_config.line_height +
    pre_config.padding_height +
    pre_config.scroll_height

  const style = {
    height: height + "px",
    background: "rgb(40, 42, 54)",
  }

  const Pre = useMemo(
    () =>
      Loadable({
        loader: () => import("./Pre").then(m => m.Pre),
        loading: () => (
          <div className="center" style={style}>
            <XL>Let us load the code module 🏋️...</XL>
          </div>
        ),
      }),
    []
  )

  return isVisible ? (
    <Pre {...props} children={code} />
  ) : (
    <div className="center" ref={ref} style={style} />
  )
})

export { Code }
