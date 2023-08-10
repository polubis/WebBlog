import React from "react"
import styled from "styled-components"
import { useCommentsProvider } from "../CommentsProvider"
import { M, S, X, XL } from "../../../../ui"
import { Header } from "../components/Header"
import { useLayoutProvider } from "../../../providers/LayoutProvider"
import { Avatar } from "../../../components/Avatar"
import { Rate } from "../../../components/Rate"
import { format } from "date-fns"
import theme from "../../../../utils/theme"
import { Comment } from "../../../core/models"

const getCommentsRate = (comments: Comment[]) => {
  const withRates = comments.filter(
    comment => comment.rate
  ) as Required<Comment>[]
  const withRatesLength = withRates.length
  const ratesSum = withRates.reduce((acc, comment) => acc + comment.rate, 0)

  return +(((ratesSum / withRatesLength) * 100) / 100).toFixed(2)
}

const Container = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto auto;
  gap: 20px;
  height: 100%;

  .comments-list {
    overflow-y: auto;
    width: calc(100% + 12px);

    & > * {
      margin-bottom: 12px;

      .avatar {
        height: 40px;
        width: 40px;
        margin-right: 12px;
      }

      .col ${S} {
        color: ${theme.grayD};
      }

      .truncated {
        margin-bottom: 8px;
      }
    }

    ${X} {
      margin-bottom: 4px;
    }
  }
`

export const CommentsList = () => {
  const layout = useLayoutProvider()
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
          <>
            <div className="comments-list">
              {state.comments.map(comment => (
                <div key={comment.id}>
                  <div className="row truncated">
                    <Avatar
                      src={comment.author.avatar}
                      alt={comment.author.nickname ?? layout.t.anonymous}
                    />
                    <div className="col">
                      {comment.rate ? (
                        <S>
                          <Rate rate={comment.rate} /> |{" "}
                          {format(new Date(comment.date), "dd/MM/yyyy hh:mm")}
                        </S>
                      ) : (
                        <S>
                          {format(new Date(comment.date), "dd/MM/yyyy hh:mm")}
                        </S>
                      )}
                      <M bold>
                        {comment.author.nickname ?? layout.t.anonymous}
                      </M>
                    </div>
                  </div>

                  <S italic>{comment.content}</S>
                </div>
              ))}
            </div>
            <div className="row">
              <X>
                {t.the_rate_is} <Rate rate={getCommentsRate(state.comments)} />
              </X>
            </div>
          </>
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
