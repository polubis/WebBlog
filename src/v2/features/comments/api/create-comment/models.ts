import { User } from "firebase/auth"
import type { CDate, Comment, Path, Rate } from "../../../../core/models"

export interface CreateCommentPayload {
  path: Path
  content: string
  rate?: Rate
}

export interface CreateCommentBody {
  [commentId: string]: {
    content: string
    rate?: Rate
    author: Comment["author"]
    date: CDate
  }
}

export interface CreateCommentResult {
  created: Comment
  updated?: Comment
}

export interface CreateCommentReturn {
  user: User
  createComment: (payload: CreateCommentPayload) => Promise<CreateCommentResult>
}

export interface LoadCommentsPayload {
  path: Path
}

export interface LoadCommentsReturn {
  loadComments: (payload: LoadCommentsPayload) => Promise<Comment[]>
}
