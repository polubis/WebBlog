import { Comment, Id, Rate, TMap } from "../core/models"
import { useArticleProvider } from "../providers/ArticleProvider"
import { useFirebase } from "./useFirebase"
import comments_en from "../translation/comments/en.json"
import comments_pl from "../translation/comments/pl.json"
import { useLayoutProvider } from "../providers/LayoutProvider"
import { tUp } from "../../utils/viewport"
import {
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth"
import { CommentsT } from "../providers/models"
import { prepareToLoadComments } from "../features/comments/api/create-comment/load-comments"
import { prepareToCreateComment } from "../features/comments/api/create-comment/create-comment"
import { useEffect } from "react"

const tComments: TMap<CommentsT> = {
  en: comments_en,
  pl: comments_pl,
}

const cache = new Map<Id, Comment[]>()
let alreadySubscribed = false

export const useCommentsManagement = () => {
  const { auth, db, provider } = useFirebase()
  const { setState, state } = useArticleProvider()
  const layout = useLayoutProvider()
  const { comments, resourcePath } = state

  const t = tComments[layout.lang.key]

  const startAdd = async () => {
    if (comments.is !== "loaded") return

    if (auth.currentUser) {
      setState({
        ...state,
        comments: {
          is: "add",
          comments: comments.comments,
          user: auth.currentUser,
        },
      })
      return
    }

    try {
      if (tUp(window.innerWidth)) {
        await signInWithPopup(auth, provider)
        return
      }

      signInWithRedirect(auth, provider)
    } catch {}
  }

  const startReadComments = () => {
    if (comments.is === "add") {
      setState({
        ...state,
        comments: {
          is: "loaded",
          comments: comments.comments,
        },
      })
    }
  }

  const reset = () => {
    if (comments.is === "loading" || comments.is === "adding") {
      return
    }

    setState({
      ...state,
      comments: {
        is: "idle",
      },
    })
  }

  const add = async (content: string, rate?: Rate) => {
    if (comments.is !== "add") return

    try {
      const { createComment, user } = prepareToCreateComment(db, auth)

      setState({
        ...state,
        comments: {
          is: "adding",
          comments: comments.comments,
          user,
        },
      })

      const { created, updated } = await createComment({
        path: resourcePath,
        content,
        rate,
      })
      const increasedComments = [created, ...comments.comments]

      setState({
        ...state,
        comments: {
          is: "loaded",
          comments: updated
            ? increasedComments.map(comment =>
                comment.id === updated.id ? updated : comment
              )
            : increasedComments,
        },
      })
    } catch (error) {
      setState({
        ...state,
        comments: {
          is: "fail",
        },
      })
    }
  }

  const load = () => {
    setState({ ...state, comments: { is: "loading" } })
  }

  useEffect(() => {
    const load = async () => {
      try {
        const commentsFromCache = cache.get(resourcePath)

        if (commentsFromCache) {
          setState({
            ...state,
            comments: {
              is: "loaded",
              comments: commentsFromCache,
            },
          })
          return
        }

        const { loadComments } = prepareToLoadComments(db)

        const loadedComments = await loadComments({ path: resourcePath })
        cache.set(resourcePath, loadedComments)

        setState({
          ...state,
          comments: {
            is: "loaded",
            comments: loadedComments,
          },
        })
      } catch (error) {
        setState({
          ...state,
          comments: {
            is: "fail",
          },
        })
      }
    }

    if (comments.is === "loading") {
      load()
      return
    }
  }, [comments])

  useEffect(() => {
    if (alreadySubscribed) return

    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        setState(state => {
          if (state.comments.is === "loaded") {
            return {
              ...state,
              comments: {
                is: "add",
                user,
                comments: state.comments.comments,
              },
            }
          }

          return state
        })
      } else {
        // Handle sign out
      }
    })

    alreadySubscribed = true

    return () => {
      unsubscribe()
    }
  }, [])

  return {
    t,
    comments,
    startAdd,
    startReadComments,
    reset,
    add,
    load,
  }
}
