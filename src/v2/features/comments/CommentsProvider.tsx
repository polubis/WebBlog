import React, {
  createContext,
  useState,
  useMemo,
  useContext,
  useEffect,
} from "react"
import type {
  AddState,
  CommentsProviderCtx,
  CommentsProviderNullableCtx,
  CommentsProviderProps,
  CommentsProviderState,
  CommentsT,
  LoadedState,
} from "./models"
import { TMap } from "../../core/models"
import comments_en from "../../translation/comments/en.json"
import comments_pl from "../../translation/comments/en.json"
import {
  signInWithPopup,
  User,
  onAuthStateChanged,
  signInWithRedirect,
} from "firebase/auth"
import { prepareToCreateComment } from "./api/create-comment/create-comment"
import { prepareToLoadComments } from "./api/create-comment/load-comments"
import { tUp } from "../../../utils/viewport"
import { summary_footer_id, scroll_to_key } from "../../core/consts"
import { useFirebaseProvider } from "../../providers/FirebaseProvider"

const Context = createContext<CommentsProviderNullableCtx>(null)

const t: TMap<CommentsT> = {
  en: comments_en,
  pl: comments_pl,
}

const addState = (state: LoadedState, user: User): AddState => ({
  is: "add",
  comments: state.comments,
  user,
})

export const CommentsProvider = ({
  children,
  path,
  lang,
}: CommentsProviderProps) => {
  const { auth, db, provider } = useFirebaseProvider()
  const [state, setState] = useState<CommentsProviderState>(() => ({
    is: "idle",
  }))

  const value = useMemo(
    (): CommentsProviderCtx => ({
      t: t[lang],
      state,
      startAdd: async () => {
        if (state.is !== "loaded") return

        if (auth.currentUser) {
          setState(addState(state, auth.currentUser))
          return
        }

        try {
          if (tUp(window.innerWidth)) {
            await signInWithPopup(auth, provider)
            return;
          }

          localStorage.setItem(scroll_to_key, summary_footer_id)
          signInWithRedirect(auth, provider)
        } catch { }
      },
      startReadComments: () => {
        if (state.is === "add") {
          setState({ is: "loaded", comments: [...state.comments] })
        }
      },
      reset: () => {
        if (state.is === "loading" || state.is === "adding") {
          return
        }

        setState({ is: "idle" })
      },
      load: async () => {
        try {
          setState({ is: "loading" })

          const { loadComments } = prepareToLoadComments(db)

          const comments = await loadComments({ path })

          setState({ is: "loaded", comments })
        } catch (error) {
          setState({ is: "fail" })
        }
      },
      add: async (content, rate) => {
        try {
          const { createComment, user } = prepareToCreateComment(db, auth)
          const { comments } = state as LoadedState

          setState({ is: "adding", comments, user })

          const { created, updated } = await createComment({
            path,
            content,
            rate,
          })
          const increasedComments = [created, ...comments]

          setState({
            is: "loaded",
            comments: updated
              ? increasedComments.map(comment =>
                comment.id === updated.id ? updated : comment
              )
              : increasedComments,
          })
        } catch (error) {
          setState({ is: "fail" })
        }
      },
    }),
    [state]
  )

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        setState(state => {
          if (state.is === "loaded") {
            return addState(state, user)
          }

          return state
        })
      } else {
        // Handle sign out
      }
    })

    return () => {
      unsubscribe()
    }
  }, [])

  return <Context.Provider value={value}>{children(value)}</Context.Provider>
}

export const useCommentsProvider = (): CommentsProviderCtx => {
  const context = useContext(Context)

  if (!context) {
    throw Error("Lack of provider!")
  }

  return context
}
