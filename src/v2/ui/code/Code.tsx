import React, { memo, useMemo, useEffect } from "react"
import Loadable from "react-loadable"
import type { CodeProps, DynamicCodeProps, StaticCodeProps } from "./models"
import { pre_config } from "./consts"
import { useIsVisible } from "../../../utils/useIsVisible"
import { useFetch } from "../../../utils/useFetch"

const getCodeSetup = (
  linesCount: number,
  hasHeader: boolean,
  Loading: CodeProps["Loading"]
) => {
  const height =
    linesCount * pre_config.line_height +
    pre_config.padding_height +
    (hasHeader ? pre_config.header_height : 0)
  const style = {
    height: height + "px",
    borderRadius: "4px",
    background: "rgb(40, 42, 54)",
  }

  const Pre = useMemo(
    () =>
      Loadable({
        loader: () => import("./Pre").then(m => m.Pre),
        loading: () => (
          <div className="ui-snippet" style={style}>
            <Loading />
          </div>
        ),
      }),
    []
  )

  return { Pre, style }
}

const StaticCode = ({ children, Loading, ...props }: StaticCodeProps) => {
  const { isVisible, ref } = useIsVisible({ threshold: 0.1, useOnce: true })

  const code = children.trim()

  const { style, Pre } = getCodeSetup(
    code.split("\n").length,
    !!props.Header,
    Loading
  )

  return isVisible ? (
    <Pre {...props} children={code} />
  ) : (
    <div className="ui-snippet" ref={ref} style={style}>
      <Loading />
    </div>
  )
}

const DynamicCode = ({
  linesCount,
  src,
  Loading,
  Error,
  onError,
  ...props
}: DynamicCodeProps) => {
  const [state, fetchCode, abort] = useFetch<string>()
  const { isVisible, ref } = useIsVisible({ threshold: 0.1, useOnce: true })
  const { style, Pre } = getCodeSetup(linesCount, !!props.Header, Loading)

  useEffect(() => {
    if (isVisible) {
      fetchCode(signal => {
        return new Promise(async (resolve, reject) => {
          const res = await fetch(src, { signal })

          if (res.ok) {
            return resolve((await res.text()).trim())
          }

          onError && onError()

          return reject("Something went wrong")
        })
      })
    }
  }, [isVisible])

  useEffect(() => {
    abort()
  }, [])

  if (state.type === "done") {
    return <Pre {...props} children={state.data} />
  }

  if (state.type === "idle") {
    return (
      <div className="ui-snippet" ref={ref} style={style}>
        <Loading />
      </div>
    )
  }

  if (state.type === "pending") {
    return (
      <div className="ui-snippet" style={style}>
        <Loading />
      </div>
    )
  }

  return (
    <div className="ui-snippet" style={style}>
      <Error />
    </div>
  )
}

const Code = memo((props: CodeProps) => {
  if (props.mode === "static") {
    return <StaticCode {...props} />
  }

  return <DynamicCode {...props} />
})

export { Code }
