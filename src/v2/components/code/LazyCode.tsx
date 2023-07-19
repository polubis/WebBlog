import React, { memo, useMemo } from "react"
import Loadable from "react-loadable"
import type { LazyCodeProps } from "./models"
import { code_config } from "./consts"
import { useIsVisible } from "../../../utils/useIsVisible"
import { XL } from "../../../ui/text/Text"

const LazyCode = memo((props: LazyCodeProps) => {
  const { isVisible, ref } = useIsVisible({ threshold: 0.1, useOnce: true })
  const code = props.children.trim()
  const height =
    code.split("\n").length * code_config.line_height +
    code_config.padding_height +
    code_config.scroll_height

  const style = {
    height: height + "px",
    background: "rgb(40, 42, 54)",
  }

  const LazyComponent = useMemo(
    () =>
      Loadable({
        loader: () => import("./Code").then(m => m.Code),
        loading: () => <div className="ui-snippet center" style={style}>
          <XL>Let us load the code module 🏋️...</XL>
        </div>,
      }),
    []
  )

  return isVisible ? (
    <LazyComponent {...props} children={code} />
  ) : (
    <div className="ui-snippet center" ref={ref} style={style} />
  )
})

export { LazyCode }
