import React, { useMemo, useEffect } from "react"
import Loadable from "react-loadable"
import type { CodeProps, DynamicCodeProps, StaticCodeProps } from "./models"
import { pre_config } from "./consts"
import { useIsVisible } from "../../../utils/useIsVisible"
import { useModal } from "../../../ui"
import { useCodeLoad } from "./useCodeLoad"

const rolled_max_line_count = 10

const getFormattedCode = (
  code: string,
  skipTrim?: boolean,
  rolled?: boolean
): string => {
  let formatted = code

  if (!skipTrim) {
    formatted = formatted.trim()
  }

  if (rolled) {
    formatted = formatted.split("\n").slice(0, rolled_max_line_count).join("\n")
  }

  return formatted
}

const getCodeSetup = (
  linesCount: number,
  rolled: boolean,
  hasHeader: boolean,
  hasFooter: boolean,
  hasDescription: boolean,
  Loading: CodeProps["Loading"]
) => {
  const rollableLinesCount = rolled ? rolled_max_line_count : linesCount
  const preservationHeight =
    rollableLinesCount * pre_config.line_height +
    pre_config.padding_height +
    pre_config.estimated_scroll_size
  const height =
    preservationHeight +
    (hasHeader ? pre_config.header_height : 0) +
    (hasFooter ? pre_config.footer_height : 0) +
    (hasDescription ? pre_config.description_height : 0)
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

  const code = getFormattedCode(children, skipTrim, toggler.isOpen)

  const { style, Pre, preservationHeight } = getCodeSetup(
    code.split("\n").length,
    !!toggler.isOpen,
    !!props.Header,
    !!props.Footer,
    !!props.description,
    Loading
  )

  return isVisible ? (
    <>
      {toggler.isOpen ? (
        <Roller onExpand={toggler.close}>
          <Pre {...props} height={preservationHeight + "px"} children={code} />
        </Roller>
      ) : (
        <Pre {...props} height={preservationHeight + "px"} children={code} />
      )}
    </>
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
    const code = getFormattedCode(state.data, skipTrim, toggler.isOpen)

    return (
      <>
        {toggler.isOpen ? (
          <Roller onExpand={toggler.close}>
            <Pre
              {...props}
              height={preservationHeight + "px"}
              children={code}
            />
          </Roller>
        ) : (
          <Pre {...props} height={preservationHeight + "px"} children={code} />
        )}
      </>
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
