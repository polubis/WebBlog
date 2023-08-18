import type { ReactNode } from "react"

type Obj = Record<string, any>

interface InjectedAlertProps {
  id: string
  delay: number
  index: number
  close: () => void
}

interface AlertsProviderCtx<P extends Obj> {
  alerts: Alert<P>[]
  add: (alert: P) => void
  remove: (id: string) => void
}

type Alert<P extends Obj> = Omit<InjectedAlertProps, "index" | "close"> & P

type AlertContainerComponent<P extends Obj> = (
  props: AlertsProviderCtx<P>
) => JSX.Element

interface AlertsProviderProps {
  children: ReactNode
}

interface AlertsProviderConfig<P extends Obj> {
  ContainerComponent: AlertContainerComponent<P>
  delay?: number
}

export type {
  AlertsProviderProps,
  InjectedAlertProps,
  AlertsProviderCtx,
  AlertContainerComponent,
  Alert,
  Obj,
  AlertsProviderConfig,
}
