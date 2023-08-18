import React, {
    createContext,
    useContext,
    useState,
    useMemo,
    useEffect,
    useRef,
} from "react"
import {
    Alert,
    AlertsProviderConfig,
    AlertsProviderCtx,
    AlertsProviderProps,
    Obj,
} from "./models"

const createAlertsProvider = <P extends Obj>({
    ContainerComponent,
    delay = 5000,
}: AlertsProviderConfig<P>) => {
    const Context = createContext<AlertsProviderCtx<P> | null>(null)

    const AlertsProvider = ({ children }: AlertsProviderProps) => {
        const [alerts, setAlerts] = useState<Alert<P>[]>([])

        const timeouts = useRef<Record<string, NodeJS.Timeout>>({})

        useEffect(() => {
            return () => {
                for (let timeout in timeouts) {
                    clearTimeout(timeout)
                }
            }
        }, [])

        const value = useMemo(
            (): AlertsProviderCtx<P> => ({
                alerts,
                add: alert => {
                    const timestamp = new Date().getTime()
                    const random = Math.floor(Math.random() * 1000000)

                    const id = alert.id ?? `${timestamp}-${random}`
                    const timeout = timeouts.current[id]

                    if (timeout) {
                        clearTimeout(timeout)
                        delete timeouts.current[id]
                    }

                    setAlerts(alerts => [...alerts, { ...alert, id, delay }])

                    timeouts.current[id] = setTimeout(() => {
                        setAlerts(alerts => alerts.filter(alert => alert.id !== id))
                        delete timeouts.current[id]
                    }, delay)
                },
                remove: id => {
                    const timeout = timeouts.current[id]

                    if (timeout) {
                        clearTimeout(timeouts.current[id])
                        delete timeouts.current[id]
                    }

                    setAlerts(alerts => alerts.filter(alert => alert.id !== id))
                },
            }),
            [alerts]
        )

        return (
            <Context.Provider value={value}>
                <ContainerComponent
                    add={value.add}
                    alerts={value.alerts}
                    remove={value.remove}
                />
                {children}
            </Context.Provider>
        )
    }

    const useAlertsProvider = (): AlertsProviderCtx<P> => {
        const ctx = useContext(Context)

        if (!ctx) {
            throw Error("Lack of provider")
        }

        return ctx
    }

    return [AlertsProvider, useAlertsProvider] as const
}

export { createAlertsProvider }
