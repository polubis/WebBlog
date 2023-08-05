import React from "react"
import styled from "styled-components"
import { useCommentsProvider } from "../CommentsProvider"
import { M, S, X, XL } from "../../../../ui"
import { Header } from "../components/Header"

const Container = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  gap: 20px;
  height: 100%;

  .comments-list {
    overflow-y: auto;
    width: calc(100% + 12px);

    & > * {
      margin-bottom: 12px;
    }

    ${X} {
      margin-bottom: 4px;
    }
  }
`

export const CommentsList = () => {
  const { state, reset, startAdd, t } = useCommentsProvider()

  if (state.is === "loaded") {
    return (
      <Container className="in">
        <Header
          text={`${t.comments} (${state.comments.length})`}
          onClose={reset}
        />
        {state.comments.length === 0 && (
          <div className="center h-full">
            <XL className="tcenter">{t.lack_of_comments}</XL>
          </div>
        )}
        {state.comments.length > 0 && (
          <div className="comments-list">
            {state.comments.map(comment => (
              <div key={comment.id}>
                <M bold>{comment.author}</M>
                <S italic>{comment.content}</S>
              </div>
            ))}
          </div>
        )}

        <button
          className="add-comment-button upper button primary w-full"
          onClick={startAdd}
          title={t.add_comment}
        >
          {t.add_comment}
        </button>
      </Container>
    )
  }

  return null
}
