import { doc, getDoc, Firestore } from "firebase/firestore"
import type { LoadCommentsReturn, LoadCommentsPayload } from "./models"
import { Comment } from "../../../../core/models"

export const prepareToLoadComments = (db: Firestore): LoadCommentsReturn => {
  return {
    loadComments: async (payload: LoadCommentsPayload) => {
      const response = (await (
        await getDoc(doc(db, "comments", payload.path))
      ).data()) as Record<string, Omit<Comment, "id">>

      if (response === undefined) {
        return []
      }

      const responseEntries = Object.entries(response)

      const comments = responseEntries
        .map<Comment>(([id, comment]) => ({
          author: comment.author,
          content: comment.content,
          id,
          rate: comment.rate,
          path: payload.path,
          date: comment.date,
        }))
        .sort((a, b) => {
          if (a.date < b.date) return -1
          if (a.date === b.date) return 0
          return 1
        })

      return comments
    },
  }
}
