import React, {
  createContext,
  useState,
  useMemo,
  useContext,
  useEffect,
} from "react"
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
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
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  User,
  onAuthStateChanged,
  signInWithRedirect,
} from "firebase/auth"
import { prepareToCreateComment } from "./api/create-comment/create-comment"
import { prepareToLoadComments } from "./api/create-comment/load-comments"
import { lUp } from "../../../utils/viewport"
import { article_comments_box_id, move_to_param } from "../../core/consts"

const Context = createContext<CommentsProviderNullableCtx>(null)

const config = {
  apiKey: process.env.GATSBY_API_KEY,
  authDomain: process.env.GATSBY_AUTH_DOMAIN,
  projectId: process.env.GATSBY_PROJECT_ID,
  storageBucket: process.env.GATSBY_STORAGE_BUCKET,
  messagingSenderId: process.env.GATSBY_MESSAGING_SENDER_ID,
  appId: process.env.GATSBY_APP_ID,
  measurementId: process.env.GATSBY_MEASURMENT_ID,
}

const t: TMap<CommentsT> = {
  en: comments_en,
  pl: comments_pl,
}

const app = initializeApp(config)
const auth = getAuth(app)
const db = getFirestore(app)
const provider = new GoogleAuthProvider()

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

        if (lUp(window.innerWidth)) {
          try {
            await signInWithPopup(auth, provider)
          } catch {}
        } else {
          localStorage.setItem(move_to_param, article_comments_box_id)
          await signInWithRedirect(auth, provider)
        }
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
          const increasedComments = [...comments, created]

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
