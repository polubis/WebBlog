import React, { createContext, useContext } from "react"

interface State {}

const Ctx = createContext()

const CodePopoverProvider = () => {
  return <Ctx.Provider></Ctx.Provider>
}

const useCodePopoverProvider = () => {
  const ctx = useContext(Ctx)

  return ctx
}

export { CodePopoverProvider, useCodePopoverProvider }
