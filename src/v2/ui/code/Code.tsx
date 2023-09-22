import React, { useMemo, useEffect } from "react"
import Loadable from "react-loadable"
import type { CodeProps, DynamicCodeProps, StaticCodeProps } from "./models"
import { pre_config } from "./consts"
import { useIsVisible } from "../../../utils/useIsVisible"
import { useModal } from "../../../ui"
import { useCodeLoad } from "./useCodeLoad"

const getFormattedCode = (code: string, skipTrim?: boolean): string =>
  skipTrim ? code : code.trim()

const calculateHeight = (
  linesCount: number,
  rolled: boolean,
  hasHeader: boolean,
  hasFooter: boolean,
  hasDescription: boolean
) => {
  const heightWhenRolled = 300

  if (rolled) return { height: heightWhenRolled, preservationHeight: 0 }

  const preservationHeight =
    linesCount * pre_config.line_height +
    pre_config.padding_height +
    pre_config.estimated_scroll_size
  const height =
    preservationHeight +
    (hasHeader ? pre_config.header_height : 0) +
    (hasFooter ? pre_config.footer_height : 0) +
    (hasDescription ? pre_config.description_height : 0)

  return { height, preservationHeight }
}

const getCodeSetup = (
  linesCount: number,
  rolled: boolean,
  hasHeader: boolean,
  hasFooter: boolean,
  hasDescription: boolean,
  Loading: CodeProps["Loading"]
) => {
  const { preservationHeight, height } = calculateHeight(
    linesCount,
    rolled,
    hasHeader,
    hasFooter,
    hasDescription
  )

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
            {Loading && <Loading />}
          </div>
        ),
      }),
    []
  )

  return { Pre, style, preservationHeight }
}

const StaticCode = ({
  children,
  Loading,
  skipTrim,
  rolled,
  Roller,
  ...props
}: StaticCodeProps) => {
  const toggler = useModal(rolled && !!Roller)
  const { isVisible, ref } = useIsVisible({ threshold: 0.1, useOnce: true })

  const code = getFormattedCode(children, skipTrim)

  const { style, Pre, preservationHeight } = getCodeSetup(
    code.split("\n").length,
    !!toggler.isOpen,
    !!props.Header,
    !!props.Footer,
    !!props.description,
    Loading
  )

  return isVisible ? (
    toggler.isOpen ? (
      <Roller onExpand={toggler.close} style={style} />
    ) : (
      <Pre {...props} height={preservationHeight + "px"} children={code} />
    )
  ) : (
    <div className="ui-snippet" ref={ref} style={style}>
      {Loading && <Loading />}
    </div>
  )
}

const DynamicCode = ({
  linesCount,
  src,
  Loading,
  Error,
  skipTrim,
  rolled,
  Roller,
  ...props
}: DynamicCodeProps) => {
  const toggler = useModal(rolled && !!Roller)
  const [state, loadCode] = useCodeLoad()
  const { isVisible, ref } = useIsVisible({ threshold: 0.1, useOnce: true })
  const { style, Pre, preservationHeight } = getCodeSetup(
    linesCount,
    !!toggler.isOpen,
    !!props.Header,
    !!props.Footer,
    !!props.description,
    Loading
  )

  useEffect(() => {
    isVisible && loadCode(src)
  }, [isVisible])

  if (state.type === "done") {
    const code = getFormattedCode(state.data, skipTrim)

    return toggler.isOpen ? (
      <Roller onExpand={toggler.close} style={style} />
    ) : (
      <Pre {...props} height={preservationHeight + "px"} children={code} />
    )
  }

  if (state.type === "idle") {
    return (
      <div className="ui-snippet" ref={ref} style={style}>
        {Loading && <Loading />}
      </div>
    )
  }

  if (state.type === "pending") {
    return (
      <div className="ui-snippet" style={style}>
        {Loading && <Loading />}
      </div>
    )
  }

  return (
    <div className="ui-snippet" style={style}>
      {Error && <Error />}
    </div>
  )
}

const Code = (props: CodeProps) =>
  props.mode === "static" ? (
    <StaticCode {...props} />
  ) : (
    <DynamicCode {...props} />
  )

export { Code }
