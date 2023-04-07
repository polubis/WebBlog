interface CommentAuthor {
  avatar: string
  username: string
}

interface Comment {
  id: string
  targetId: string
  content: string
  date: string
  author: CommentAuthor
  comments: Comment[]
}

export { Comment }
