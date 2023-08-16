import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react"
import {
    VotesProviderCtx,
    VotesProviderOk,
    VotesProviderProps,
    VotesProviderState,
} from "./models"
import { Vote } from "../core/models"
import { useFirebaseProvider } from "./FirebaseProvider"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { from, switchMap, Subject, tap, debounceTime, Subscription } from "rxjs"

const Context = createContext<VotesProviderCtx | null>(null)

export const VotesProvider = ({ children, path }: VotesProviderProps) => {
    const { db } = useFirebaseProvider()
    const [state, setState] = useState<VotesProviderState>(() => ({
        is: "idle",
    }))

    const load = useMemo(() => new Subject<void>(), [])
    const load$ = useMemo(() => load.asObservable(), [])

    const update = useMemo(() => new Subject<VotesProviderOk>(), [])
    const update$ = useMemo(() => update.asObservable(), [])

    const subs = useMemo(() => {
        const docRef = doc(db, "votes", path)

        const subs = new Subscription()

        subs.add(
            update$
                .pipe(
                    tap(newState => {
                        setState(newState)
                    }),
                    debounceTime(3500),
                    tap(state => {
                        setState({ ...state, is: "saving" })
                    }),
                    switchMap(payload =>
                        from(getDoc(docRef)).pipe(
                            switchMap(doc => {
                                const dbVote = doc.data() as Vote | undefined

                                const vote: Vote = {
                                    positive: payload.vote.positive,
                                    negative: payload.vote.negative,
                                }

                                if (dbVote) {
                                    vote.negative =
                                        dbVote.negative +
                                        Math.abs(dbVote.negative - payload.vote.negative)
                                    vote.positive =
                                        dbVote.positive +
                                        Math.abs(dbVote.positive - payload.vote.positive)
                                }

                                return from(setDoc(docRef, vote)).pipe(
                                    tap(() => {
                                        setState({ vote, is: "ok" })
                                    })
                                )
                            })
                        )
                    )
                )
                .subscribe()
        )

        subs.add(
            load$
                .pipe(
                    tap(() => {
                        setState({ is: "loading" })
                    }),
                    switchMap(() =>
                        from(getDoc(docRef)).pipe(
                            tap(doc => {
                                const vote = doc.data() as Vote | undefined
                                setState({
                                    is: "ok",
                                    vote: vote ?? { positive: 0, negative: 0 },
                                })
                            })
                        )
                    )
                )
                .subscribe()
        )

        return subs;
    }, [])

    useEffect(() => {
        return () => {
            subs.unsubscribe()
        }
    }, [])

    const value = useMemo(
        (): VotesProviderCtx => ({
            state,
            load: () => {
                if (state.is === "idle") {
                    load.next()
                }
            },
            addNegative: () => {
                if (state.is === "ok") {
                    update.next({
                        ...state,
                        vote: {
                            ...state.vote,
                            negative: state.vote.negative + 1,
                        },
                    })
                }
            },
            addPositive: () => {
                if (state.is === "ok") {
                    update.next({
                        ...state,
                        vote: {
                            ...state.vote,
                            positive: state.vote.positive + 1,
                        },
                    })
                }
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
