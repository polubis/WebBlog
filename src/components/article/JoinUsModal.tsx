import React, { useState } from "react"
import styled from "styled-components"

import { Modal, Field, Input, Textarea, XL, M } from "../../ui"
import { Alert } from "../../ui/alert"
import theme from "../../utils/theme"
import { useCustomGAEvent } from "../../utils/useCustomGAEvent"
import { SM_DOWN } from "../../utils/viewport"
import Button, { SecondaryTextButton } from "../button/Button"

const Container = styled.form`
  display: flex;
  flex-flow: column;
  padding: 24px 12px;
  width: 340px;

  @media ${SM_DOWN} {
    padding: 0;
    width: 100%;
  }

  ${XL} {
    text-align: center;
  }

  & > :nth-child(1) {
    margin-bottom: 40px;
  }

  & > *:nth-child(3) {
    margin: 20px 0 0 0;
  }

  .submit-btn {
    margin: 32px 0 12px 0;
  }

  .error {
    color: ${theme.error};
  }

  .ok {
    color: ${theme.green};
    margin-bottom: 24px;
  }

  .error,
  .ok {
    margin-top: 8px;
  }
`

type JoinStatus =
  | { type: "idle" }
  | {
      type: "pending"
    }
  | { type: "success" }
  | { type: "failure"; message: string }

export interface JoinUsModalProps {
  onClose: () => void
}

export const JoinUsModal = ({ onClose }: JoinUsModalProps) => {
  const [status, setStatus] = useState<JoinStatus>({ type: "idle" })
  const [email, setEmail] = useState("")
  const [about, setAbout] = useState("")

  const { track } = useCustomGAEvent()

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault()

    setStatus({ type: "pending" })

    try {
      track({
        name: "author_request",
        payload: { email, about },
      })
      setStatus({ type: "success" })
    } catch (err) {
      setStatus({
        type: "failure",
        message:
          "Hmmm, we are currently unable to serve this request, please try again later :)",
      })
    }
  }

  const pending = status.type === "pending"

  const handleClose = () => {
    if (pending) {
      return
    }

    onClose()
  }

  return (
    <>
      {pending && <Alert message="Just a moment :)" />}
      <Modal onClose={handleClose}>
        <Container onSubmit={handleSubmit}>
          <XL>Join us</XL>
          <Field description="Here we will send the answer">
            <Input
              required
              placeholder="Email*"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </Field>
          <Field description="Few words about (max 100)">
            <Textarea
              required
              maxLength={100}
              placeholder="About you*"
              value={about}
              onChange={e => setAbout(e.target.value)}
            />
          </Field>
          {status.type === "success" && (
            <M className="ok">
              We have your submission! We will get back to you within 2 days
            </M>
          )}
          {status.type === "failure" && (
            <M className="error">{status.message}</M>
          )}
          {status.type !== "success" && (
            <Button className="submit-btn" type="submit" disabled={pending}>
              SEND
            </Button>
          )}
          <SecondaryTextButton
            className="close-btn"
            type="submit"
            disabled={pending}
            onClick={onClose}
          >
            CLOSE
          </SecondaryTextButton>
        </Container>
      </Modal>
    </>
  )
}
