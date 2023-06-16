import React from "react"
import styled from "styled-components"

import { Field, Input, Textarea, XL, M, A, B } from "../../ui"
import { Alert } from "../../ui/alert"
import theme from "../../utils/theme"
import { useCustomGAEvent } from "../../utils/useCustomGAEvent"
import Button, { SecondaryTextButton } from "../../components/button/Button"
import Divider from "../../components/divider/Divider"
import { Validator, useForm } from "../../utils/useForm"
// import { Checkbox } from "../../components/checkbox"
import { Signal, useFetch } from "../../utils/useFetch"
import Section from "../../components/article/Section"
import { SnippetFrame } from "../../models"
import { Link } from "gatsby"
import { useKeyPress } from "../../utils/useKeyPress"
import { Center } from "./Center"
import { useLeavePageAlert } from "../../utils/useLeavePageAlert"

const FinalScreen = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  max-width: 500px;
  min-height: 500px;

  button {
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
    background: "#888";
    margin: 40px auto;
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

// const GifQuestion = styled.div`
//   display: flex;
//   flex-flow: column;

//   ${M} {
//     margin: 24px 0 12px 0;
//   }
// `

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

const Footer = styled.div`
  display: flex;
  align-items: center;

  & > *:not(:last-child) {
    margin-right: 8px;
  }
`

const required: Validator<string> = value =>
  value === "" ? "This field is required" : ""
const maxLength = (limit: number): Validator<string> => value =>
  value.length >= limit ? `Length must be <= ${limit}` : ""

export const CreateSnippetForm = ({
  frames,
  onBack,
}: CreateSnippetFormProps) => {
  const { track } = useCustomGAEvent()
  const [{ values, valid }, { set }] = useForm<FormData>({
    values: {
      name: "",
      description: "",
      gifUrl: "http://localhost:8000/snippet-creator",
      generateGif: false,
    },
    validators: {
      name: [required, maxLength(200)],
      description: [required, maxLength(500)],
      gifUrl: [maxLength(300)],
    },
  })
  const [creationState, startSnippetCreation] = useFetch()

  useLeavePageAlert({
    text:
      "After leaving this page your progress will not be saved. Are you sure?",
    active: creationState.type === "pending",
  })

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
            description: payload.name,
            name: payload.description,
          })),
        })
      )
    )
  }

  if (creationState.type === "done") {
    return (
      <Center className="create-snippet-form-final-screen">
        <FinalScreen>
          <Section>
            <XL>Thanks for using our application!</XL>
            <M>
              Now you can share this snippet via{" "}
              <A href={"/snippets/?id=" + creationState.data + "/"} outside>
                this link
              </A>
              .
            </M>
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
            <Footer>
              <Link to={"/snippets/?id=" + creationState.data + "/"}>
                <Button>GO TO SNIPPET</Button>
              </Link>
              <Button onClick={handleBack}>GENERATE ONE MORE</Button>
            </Footer>
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
          <Field description="Your snippet name (max 250)">
            <Input
              autoFocus
              required
              placeholder="Name*"
              maxLength={200}
              value={values.name}
              onChange={e => set({ key: "name", value: e.target.value })}
            />
          </Field>
          <Field description="What's going on (max 500)">
            <Textarea
              required
              maxLength={500}
              value={values.description}
              placeholder="Description*"
              onChange={e => set({ key: "description", value: e.target.value })}
            />
          </Field>

          {/* <GifQuestion>
          <M>Do you want to have a gif?</M>
          <FieldContainer>
            <Checkbox
              active={!!values.generateGif}
              onClick={() => set({ key: "generateGif", value: true })}
            >
              Yes
            </Checkbox>
            <Checkbox
              active={!values.generateGif}
              onClick={() => set({ key: "generateGif", value: false })}
            >
              No thanks
            </Checkbox>
          </FieldContainer>
        </GifQuestion> */}

          <Divider className="submit-divider" horizontal />

          <FieldContainer className="submit-field">
            <SecondaryTextButton
              type="button"
              disabled={pending}
              onClick={handleBack}
            >
              BACK
            </SecondaryTextButton>
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
