import React, { FormEventHandler } from "react"
import { useCommentsProvider } from "../CommentsProvider"
import { useForm } from "../../../../utils/useForm"
import { Input, Textarea } from "../../../../ui"
import type { Comment } from "../../../core/models"
import styled from "styled-components"
import { Header } from "../components/Header"
import { maxLength, minLength, required } from "../../../../utils/validators"
import { useLayoutProvider } from "../../../providers/LayoutProvider"

const Container = styled.form`
  & > * {
    &:nth-child(2) {
      margin: 20px 0 12px 0;
    }

    &:nth-child(4) {
      margin: 20px 0 12px 0;
    }
  }
`

const configuration = {
  values: { content: "", author: "" },
  validators: {
    content: [
      required("Required"),
      minLength(2, "Invalid length"),
      maxLength(200, "Invalid length"),
    ],
    author: [
      required("Required"),
      minLength(2, "Invalid length"),
      maxLength(200, "Invalid length"),
    ],
  },
}

export const CommentsForm = () => {
  const layout = useLayoutProvider()
  const comments = useCommentsProvider()
  const [{ values, invalid }, { set }] = useForm<Omit<Comment, "id" | "path">>(
    configuration
  )

  const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault()
    comments.add(values)
  }

  return (
    <Container className="col in" onSubmit={handleSubmit}>
      <Header text="Add comment" onClose={comments.reset} />
      <Input
        autoFocus
        placeholder={`${comments.t.nick}*`}
        value={values.author}
        onChange={e => set({ key: "author", value: e.target.value })}
      />

      <Textarea
        value={values.content}
        placeholder={`${comments.t.content}*`}
        onChange={e => set({ key: "content", value: e.target.value })}
      />
      <div className="footer">
        <button
          className="upper button secondary w-full"
          disabled={comments.state.is === "adding"}
          type="button"
          title={layout.t.back}
          onClick={comments.startReadComments}
        >
          {layout.t.back}
        </button>
        <button
          className="upper button primary w-full"
          disabled={comments.state.is === "adding" || invalid}
          type="submit"
          title={layout.t.confirm}
        >
          {layout.t.confirm}
        </button>
      </div>
    </Container>
  )
}
