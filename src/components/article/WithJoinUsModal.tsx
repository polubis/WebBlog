import React, { createContext, ReactNode, useContext } from "react"
import { useModal } from "../../ui"
import Loadable from "react-loadable"

const Ctx = createContext<ReturnType<typeof useModal> | null>(null)

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

  if (!ctx) {
    throw Error("Lack of Provider")
  }

  return ctx
}
