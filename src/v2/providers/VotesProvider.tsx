import React, { createContext, useContext, useMemo, useState } from "react"
import {
    VotesProviderCtx,
    VotesProviderProps,
    VotesProviderState,
} from "./models"
import { Vote } from "../core/models"

const Context = createContext<VotesProviderCtx | null>(null)

const createVote = (vote: Partial<Vote> = {}): Vote => {
    const finalVote: Vote = {
        positive: 0,
        negative: 0,
        id: new Date().toISOString(),
        path: "",
        date: new Date().toISOString(),
        ...vote,
    }

    return finalVote
}

export const VotesProvider = ({ children, vote }: VotesProviderProps) => {
    const [state, setState] = useState<VotesProviderState>(() => ({ vote }))

    const value = useMemo(
        (): VotesProviderCtx => ({
            ...state,
            addPositive: () => {
                setState((state) => ({
                    ...state,
                    vote: createVote(state.vote)
                }))

                return Promise.resolve()
            },
        }),
        [state]
    )

    return <Context.Provider value={value}>{children(value)}</Context.Provider>
}

export const useVotesProvider = (): VotesProviderCtx => {
    const context = useContext(Context)

    if (!context) {
        throw Error("Lack of provider!")
    }

    return context
}
