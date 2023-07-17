import React from "react"
import styled from "styled-components"

import { Field, Input, Textarea, XL, M, A, B } from "../../ui"
import { Alert } from "../../ui/alert"
import theme from "../../utils/theme"
import { useCustomGAEvent } from "../../utils/useCustomGAEvent"
import Button from "../../components/button/Button"
import Divider from "../../components/divider/Divider"
import { Validator, useForm } from "../../utils/useForm"
import { Signal, useFetch } from "../../utils/useFetch"
import Section from "../../components/article/Section"
import { SnippetFrame } from "../../models"
import { useKeyPress } from "../../utils/useKeyPress"
import { Center } from "./Center"
import {
  SNIPPET_DESCRIPTION_MAX_LENGTH,
  SNIPPET_DESCRIPTION_MIN_LENGTH,
  SNIPPET_NAME_MAX_LENGTH,
  SNIPPET_NAME_MIN_LENGTH,
} from "./consts"
import { InteractiveButton } from "../../ui/snippet/InteractiveButton"
import { useClipboard } from "../../utils/useClipboard"

const FinalScreen = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  max-width: 500px;
  min-height: 500px;

  .copy-snippet-link-btn {
    margin: 16px 0;
  }

  .footer {
    margin-top: 28px;
  }
`

const Container = styled.form`
  padding: 20px;
  max-width: 400px;

  ${XL} {
    text-align: center;
  }

  & > :nth-child(1) {
    margin-bottom: 40px;
  }

  & > *:nth-child(3) {
    margin: 20px 0 0 0;
  }

  .error {
    color: ${theme.error};
    text-align: center;
    margin-top: 32px;
  }

  .submit-divider {
    background: #888;
    margin: 40px auto;
  }

  .copy-snippet-link-btn {
    margin-bottom: 20px;
  }
`

const FieldContainer = styled.div`
  display: flex;
  align-items: center;

  & > *:first-child {
    margin-right: 4%;
  }

  button {
    width: 47%;
  }
`

export interface CreateSnippetFormProps {
  frames: SnippetFrame[]
  onBack: () => void
}

interface FormData {
  name: string
  description: string
  gifUrl: string
  generateGif: boolean
}

const createSnippet = async (signal: Signal, body: string): Promise<string> => {
  const response = await fetch(
    (process.env as any).GATSBY_API_URL + "/Snippets",
    {
      signal,
      body,
      method: "post",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )

  if (response.status < 200 || response.status >= 400) {
    return Promise.reject(new Error("Error"))
  }

  const result = (await response.json()) as { data: string }

  return result.data
}

const required: Validator<string> = value =>
  value === "" ? "This field is required" : ""
const minLength = (limit: number): Validator<string> => value =>
  value.length <= limit ? `Length must be >= ${limit}` : ""
const maxLength = (limit: number): Validator<string> => value =>
  value.length >= limit ? `Length must be <= ${limit}` : ""

export const CreateSnippetForm = ({
  frames,
  onBack,
}: CreateSnippetFormProps) => {
  const { track } = useCustomGAEvent()
  const { copy } = useClipboard()
  const [{ values, valid }, { set }] = useForm<FormData>({
    values: {
      name: "",
      description: "",
      gifUrl: "http://localhost:8000/snippet-creator",
      generateGif: false,
    },
    validators: {
      name: [
        required,
        minLength(SNIPPET_NAME_MIN_LENGTH),
        maxLength(SNIPPET_NAME_MAX_LENGTH),
      ],
      description: [
        required,
        minLength(SNIPPET_DESCRIPTION_MIN_LENGTH),
        maxLength(SNIPPET_DESCRIPTION_MAX_LENGTH),
      ],
      gifUrl: [],
    },
  })
  const [creationState, startSnippetCreation] = useFetch()

  const handleBack = (): void => {
    if (creationState.type !== "pending") {
      onBack()
    }
  }

  useKeyPress({
    onKeyPress: e => {
      const actions = {
        escape: handleBack,
      }

      actions[e.key.toLowerCase()]?.()
    },
  })

  const pending = creationState.type === "pending"

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault()

    track({
      name: "snippet_created",
    })

    const { generateGif, ...payload } = values

    startSnippetCreation(signal =>
      createSnippet(
        signal,
        JSON.stringify({
          ...payload,
          frames: frames.map(frame => ({
            code: frame.code,
            animation: frame.animation,
            description: "Some description because not finished yet :)",
            name: "Some name because not finished yet",
          })),
        })
      )
    )
  }

  if (creationState.type === "done") {
    const link = "/snippet-creator/?id=" + creationState.data + "/"

    return (
      <Center className="create-snippet-form-final-screen">
        <FinalScreen>
          <Section>
            <XL>Thanks for using our application!</XL>
            <M>
              Now you can share this snippet via{" "}
              <A href={link} outside>
                this link
              </A>
              .
            </M>
            <M>
              <B>
                Very important! Save the link with the created snippet
                somewhere.
              </B>
            </M>
            <InteractiveButton
              className="copy-snippet-link-btn"
              onClick={() => copy(window.location.origin + link)}
            >
              {status =>
                status === "pending" ? <>✂️ Copied</> : <>✂️ Copy link</>
              }
            </InteractiveButton>
            <M>
              If you enjoyed this mini application or you have suggestion feel
              free to write to{" "}
              <A
                href="https://www.linkedin.com/in/adrian-po%C5%82ubi%C5%84ski-281ab2172/"
                outside
              >
                Adrian Połubiński
              </A>{" "}
              on <B>Linkedin</B>.
            </M>
            <footer className="footer">
              <A href={link} outside>
                <Button>GO TO SNIPPET</Button>
              </A>
              <A href="/snippet-creator/">
                <Button>I WANT NEW SNIPPET</Button>
              </A>
            </footer>
          </Section>
        </FinalScreen>
      </Center>
    )
  }

  return (
    <>
      {pending && <Alert message="Just a moment :)" />}
      <Center>
        <Container className="create-snippet-form" onSubmit={handleSubmit}>
          <XL>Describe your snippet and save it</XL>
          <Field
            description={`Name your snippet (${SNIPPET_NAME_MIN_LENGTH + "-" + SNIPPET_NAME_MAX_LENGTH
              }) characters`}
          >
            <Input
              autoFocus
              required
              placeholder="Name*"
              value={values.name}
              onChange={e => set({ key: "name", value: e.target.value })}
            />
          </Field>
          <Field
            description={`What's going on (${SNIPPET_DESCRIPTION_MIN_LENGTH +
              "-" +
              SNIPPET_DESCRIPTION_MAX_LENGTH
              } characters)`}
          >
            <Textarea
              required
              value={values.description}
              placeholder="Description*"
              onChange={e => set({ key: "description", value: e.target.value })}
            />
          </Field>

          <Divider className="submit-divider" horizontal />

          <FieldContainer className="submit-field">
            <Button
              type="button"
              disabled={pending}
              onClick={handleBack}
            >
              BACK
            </Button>
            <Button
              className="submit-form-btn"
              type="submit"
              disabled={pending || !valid}
            >
              SUBMIT
            </Button>
          </FieldContainer>

          {creationState.type === "fail" && (
            <M className="error">Something went wrong - please try again.</M>
          )}
        </Container>
      </Center>
    </>
  )
}
