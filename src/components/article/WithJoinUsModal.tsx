import React, { createContext, ReactNode, useContext } from "react"
import { useModal } from "../../ui"
import Loadable from "react-loadable"

const defaultCtxValue: ReturnType<typeof useModal> = {
  isOpen: false,
  open: () => {},
  close: () => {},
  toggle: () => {},
}

const Ctx = createContext(defaultCtxValue)

const JoinUsModal = Loadable({
  loader: () => import("./JoinUsModal").then(m => m.JoinUsModal),
  loading: () => null,
})

interface WithJoinUsModalProps {
  children: ReactNode
}

export const WithJoinUsModal = ({ children }: WithJoinUsModalProps) => {
  const handler = useModal()

  return (
    <Ctx.Provider value={handler}>
      {handler.isOpen && <JoinUsModal onClose={handler.close} />}
      {children}
    </Ctx.Provider>
  )
}

export const useJoinUsModal = () => {
  const ctx = useContext(Ctx)

  return ctx ? ctx : defaultCtxValue
}
