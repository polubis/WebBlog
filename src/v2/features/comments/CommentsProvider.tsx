import React, { createContext, useState, useMemo, useContext } from "react"
import { initializeApp } from "firebase/app"
import {
  doc,
  getDoc,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore"
import { v4 } from "uuid"
import type {
  CommentsProviderCtx,
  CommentsProviderNullableCtx,
  CommentsProviderProps,
  CommentsProviderState,
  CommentsT,
  LoadedState,
} from "./models"
import { Comment, TMap } from "../../core/models"
import comments_en from "../../translation/comments/en.json"
import comments_pl from "../../translation/comments/en.json"
import { getAuth, signInWithPopup, GoogleAuthProvider, User } from "firebase/auth";

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
const auth = getAuth(app);
const cache = new Map<string, Comment[]>()

const provider = new GoogleAuthProvider();

const authorizeViaGoogle = async (): Promise<User> => {
  if (auth.currentUser) {
    return Promise.resolve(auth.currentUser)
  }
  try {
    const { user } = await signInWithPopup(auth, provider)
    return Promise.resolve(user)
  } catch (error) {
    return Promise.reject(error)
  }
}

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
        if (state.is === "loaded") {
          try {
            await authorizeViaGoogle();
            setState({ is: "add", comments: [...state.comments] })
          } catch (error) {
          }
        }
      },
      startReadComments: () => {
        if (state.is === "add" || state.is === 'add_fail') {
          setState({ is: "loaded", comments: [...state.comments] })
        }
      },
      reset: () => {
        setState({ is: "idle" })
      },
      load: async () => {
        const cachedComments = cache.get(path)

        if (Array.isArray(cachedComments)) {
          setState({ is: "loaded", comments: cachedComments })
          return
        }

        try {
          setState({ is: "loading" })

          const db = getFirestore(app)

          const response = (await (
            await getDoc(doc(db, "comments", path))
          ).data()) as Record<string, Comment>

          if (response === undefined) {
            setState({ is: "loaded", comments: [] })
            return
          }

          const comments = Object.entries(response)
            .map<Comment>(([id, comment]) => ({
              author: comment.author,
              content: comment.content,
              id,
              path,
            }))
            .sort((a, b) => {
              if (a.id > b.id) return 1
              if (a.id === b.id) return 0
              return -1
            })

          cache.set(path, comments)
          setState({ is: "loaded", comments })
        } catch (error) {
          setState({ is: "load_fail" })
        }
      },
      add: async comment => {
        const { comments } = state as LoadedState

        setState({ is: "adding", comments })

        try {
          const db = getFirestore(app)

          const docRef = doc(db, "comments", path)

          const commentsDoc = await getDoc(docRef)
          const id = v4()
          const body = {
            [v4()]: {
              content: comment.content,
              author: comment.author,
            },
          }

          if (commentsDoc.exists()) {
            await updateDoc(docRef, body)
          } else {
            await setDoc(docRef, body)
          }

          setState({
            is: "loaded",
            comments: [...comments, { ...comment, id, path }],
          })
        } catch (error) {
          setState({ is: "add_fail", comments })
        }
      },
    }),
    [state]
  )

  return <Context.Provider value={value}>{children(value)}</Context.Provider>
}

export const useCommentsProvider = (): CommentsProviderCtx => {
  const context = useContext(Context)

  if (!context) {
    throw Error("Lack of provider!")
  }

  return context
}
