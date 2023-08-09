import type { Auth } from "firebase/auth"
import { setDoc, updateDoc, doc, getDoc, Firestore } from "firebase/firestore"
import { v4 } from "uuid"
import type {
  CreateCommentBody,
  CreateCommentResult,
  CreateCommentReturn,
} from "./models"
import { Comment } from "../../../../core/models"

export const prepareToCreateComment = (
  db: Firestore,
  auth: Auth
): CreateCommentReturn => {
  const user = auth.currentUser

  if (!user) {
    throw Error("Lack of authorization")
  }

  return {
    user,
    createComment: async payload => {
      const docRef = doc(db, "comments", payload.path)
      const commentsDoc = await getDoc(docRef)
      const commentId = v4()
      const author: CreateCommentBody[string]["author"] = {
        id: user.uid,
        nickname: user.displayName,
        avatar: user.photoURL,
      }
      const body: CreateCommentBody = {
        [commentId]: {
          content: payload.content,
          rate: payload.rate,
          author,
          date: new Date().toISOString(),
        },
      }

      const comments = Object.entries(commentsDoc.data() ?? {}) as [
        string,
        Omit<Comment, "id">
      ][]
      let updated: Comment | undefined
      const ratedComment = comments.find(
        ([, comment]) =>
          comment.author.id === author.id && comment.rate !== undefined
      )

      if (ratedComment && payload.rate) {
        const [id, comment] = ratedComment

        if (comment.rate !== payload.rate) {
          updated = {
            ...comment,
            id,
            rate: payload.rate,
          }

          await updateDoc(docRef, {
            [ratedComment[0]]: updated,
          })
        }
      }

      if (!body[commentId].rate || !!ratedComment) {
        delete body[commentId].rate
      }

      const comment: Comment = {
        ...body[commentId],
        id: commentId,
        path: payload.path,
      }

      const result: CreateCommentResult = {
        created: comment,
        updated,
      }

      if (commentsDoc.exists()) {
        await updateDoc(docRef, body)
        return result
      }

      await setDoc(docRef, body)
      return result
    },
  }
}
