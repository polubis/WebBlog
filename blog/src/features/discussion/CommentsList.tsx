import React from "react"
import { Comment } from "../../models"
import styled from "styled-components"
import { M, S, X } from "../../ui"
import theme from "../../utils/theme"

interface CommentsListProps {
  comments: Comment[]
}

const List = styled.ul``

const ListItem = styled.li``

const TextContainer = styled.div`
  display: flex;
  flex-flow: column;

  ${S} {
    color: ${theme.grayD};
  }

  ${M} {
    margin: 4px 0 12px 0;
  }
`

const CommentsList = ({ comments }: CommentsListProps) => {
  return (
    <List>
      {comments.map(comment => (
        <ListItem key={comment.id}>
          <TextContainer>
            <S>{comment.date}</S>
            <X>{comment.author.username}</X>
            <M>{comment.content}</M>
          </TextContainer>
        </ListItem>
      ))}
    </List>
  )
}

export { CommentsList }
