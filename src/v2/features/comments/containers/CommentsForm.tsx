import React, { FormEventHandler, useMemo } from "react"
import { useForm } from "../../../../utils/useForm"
import { M, S, Textarea } from "../../../../ui"
import type { Rate as RateModel } from "../../../core/models"
import styled from "styled-components"
import { Header } from "../components/Header"
import { maxLength, minLength, required } from "../../../../utils/validators"
import { useLayoutProvider } from "../../../providers/LayoutProvider"
import { Avatar } from "../../../components/Avatar"
import theme from "../../../../utils/theme"
import { Rate } from "../../../components/Rate"
import { useCommentsManagement } from "../../../logic/useCommentsManagement"

const Container = styled.form`
  height: 100%;

  & > * {
    &:first-child {
      margin-top: auto;
    }

    &:nth-child(2) {
      margin: 20px 0 16px 0;
    }

    &:nth-child(4) {
      margin: 20px 0 16px 0;
    }
  }

  .comments-form-author-section {
    background: #2d2d2d;
    border-radius: 4px;
    padding: 8px 12px;

    .truncated {
      margin-left: 12px;
    }
  }

  .rate-field {
    ${M} {
      color: ${theme.grayA};
      margin-bottom: 4px;
    }

    ${S} {
      margin-top: 4px;
    }
  }
`

export const CommentsForm = () => {
  const comments = useCommentsManagement()

  const userRate = useMemo(() => {
    const state = comments.comments

    if (state.is === "add" || state.is === "adding") {
      return (
        state.comments.find(
          comment =>
            comment.author.id === state.user.uid && comment.rate !== undefined
        )?.rate ?? 0
      )
    }

    return 0
  }, [])

  const layout = useLayoutProvider()
  const [{ values, invalid }, { set }] = useForm<{
    content: string
    rate: number
  }>({
    values: { content: "", rate: userRate },
    validators: {
      content: [
        required("Required"),
        minLength(2, "Invalid length"),
        maxLength(200, "Invalid length"),
      ],
    },
  })

  const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault()
    comments.add(
      values.content,
      values.rate > 0 ? (values.rate as RateModel) : undefined
    )
  }

  if (comments.comments.is === "add" || comments.comments.is === "adding") {
    const { user } = comments.comments
    const nickname = user.displayName ?? layout.t.anonymous

    return (
      <Container className="col in" onSubmit={handleSubmit}>
        <Header
          text="Add comment"
          disabled={comments.comments.is === "adding"}
          onClose={comments.reset}
        />
        <div className="comments-form-author-section row">
          <Avatar src={user.photoURL} alt={nickname} />
          <M className="truncated">{nickname}</M>
        </div>
        <Textarea
          autoFocus
          value={values.content}
          placeholder={`${comments.t.content}*`}
          onChange={e => set({ key: "content", value: e.target.value })}
        />
        <div className="rate-field col">
          <M>
            {comments.t.rate} {values.rate > 0 && <Rate rate={values.rate} />}
          </M>
          <input
            step={1}
            min={1}
            value={values.rate}
            max={10}
            type="range"
            onChange={e =>
              set({ key: "rate", value: +e.target.value as RateModel })
            }
          />
          <S>
            {userRate > 0
              ? comments.t.we_spotted_rate
              : comments.t.rate_description}
          </S>
        </div>
        <div className="footer">
          <button
            className="upper button secondary w-full"
            disabled={comments.comments.is === "adding"}
            type="button"
            title={layout.t.back}
            onClick={comments.startReadComments}
          >
            {layout.t.back}
          </button>
          <button
            className="upper button primary w-full"
            disabled={comments.comments.is === "adding" || invalid}
            type="submit"
            title={layout.t.confirm}
          >
            {layout.t.confirm}
          </button>
        </div>
      </Container>
    )
  }

  return null
}
