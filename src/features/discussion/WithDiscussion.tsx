import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import { DiscussionWidget } from "./DiscussionWidget"
import { Comment } from "../../models"
import {
  catchError,
  EMPTY,
  filter,
  from,
  Subject,
  Subscription,
  switchMap,
  takeUntil,
  tap,
  throttleTime,
} from "rxjs"

interface DiscussionIdle {
  status: "idle"
}

interface DiscussionLoading {
  status: "loading"
}

interface DiscussionLoaded {
  status: "loaded"
  comments: Comment[]
}

interface DiscussionLoadFailed {
  status: "loadFailed"
}

type DiscussionState =
  | DiscussionIdle
  | DiscussionLoaded
  | DiscussionLoading
  | DiscussionLoadFailed

interface DiscussionContextValue {
  state: DiscussionState
  open: () => void
  close: () => void
}

const defaultState = {
  status: "idle",
} as DiscussionState

const defaultCtxValue: DiscussionContextValue = {
  state: defaultState,
  open: () => {},
  close: () => {},
}

const Ctx = createContext(defaultCtxValue)

interface WithDiscussionProps {
  children: ReactNode
}

const WithDiscussion = ({ children }: WithDiscussionProps) => {
  const [state, setState] = useState(defaultState)

  const openAction = useMemo(() => new Subject<DiscussionState>(), [])
  const openAction$ = useMemo(() => openAction.asObservable(), [])
  const closeAction = useMemo(() => new Subject<DiscussionState>(), [])
  const closeAction$ = useMemo(() => closeAction.asObservable(), [])

  useEffect(() => {
    const subs = new Subscription()

    subs.add(
      openAction$
        .pipe(
          throttleTime(500),
          filter(currState => currState.status === "idle"),
          switchMap(() => {
            setState({ status: "loading" })

            return from(
              new Promise<Comment[]>(resolve => {
                setTimeout(() => {
                  resolve([
                    {
                      id: "0",
                      targetId: "react-code-snippet-component/",
                      content: "My some content",
                      date: new Date().toISOString(),
                      author: {
                        avatar:
                          "/static/0f4f2984b29787ec733bbf691dd4c934/14b42/polubis.jpg",
                        username: "tomcio",
                      },
                      comments: [],
                    },
                  ] as Comment[])
                }, 3000)
              })
            ).pipe(
              takeUntil(closeAction$),
              tap(comments => setState({ status: "loaded", comments })),
              catchError(() => {
                setState({ status: "loadFailed" })
                return EMPTY
              })
            )
          })
        )
        .subscribe()
    )

    subs.add(
      closeAction$
        .pipe(
          throttleTime(500),
          tap(() => setState({ status: "idle" }))
        )
        .subscribe()
    )

    return () => {
      subs.unsubscribe()
    }
  }, [])

  const open = (): void => {
    openAction.next(state)
  }

  const close = (): void => {
    closeAction.next(state)
  }

  const value = useMemo(() => {
    return {
      state,
      open,
      close,
    }
  }, [state])

  return (
    <Ctx.Provider value={value}>
      {state.status !== "idle" && <DiscussionWidget />}
      {children}
    </Ctx.Provider>
  )
}

const useWithDiscussion = () => {
  const ctx = useContext(Ctx)

  return ctx ? ctx : defaultCtxValue
}

export type { DiscussionState }

export { useWithDiscussion, WithDiscussion }
