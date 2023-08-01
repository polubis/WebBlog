import React, { useMemo } from "react"
import styled from "styled-components"

import { Field, Input, Textarea, XL, M, A, B } from "../../../../ui"
import { Alert } from "../../../../ui/alert"
import theme from "../../../../utils/theme"
import { useCustomGAEvent } from "../../../../utils/useCustomGAEvent"
import Button from "../../../../components/button/Button"
import Divider from "../../../../components/divider/Divider"
import { Validator, useForm } from "../../../../utils/useForm"
import { Signal, useFetch } from "../../../../utils/useFetch"
import Section from "../../../../components/article/Section"
import { useKeyPress } from "../../../../utils/useKeyPress"
import { Center } from "../components/Center"
import {
  SNIPPET_DESCRIPTION_MAX_LENGTH,
  SNIPPET_DESCRIPTION_MIN_LENGTH,
  SNIPPET_NAME_MAX_LENGTH,
  SNIPPET_NAME_MIN_LENGTH,
} from "../core/config"
import { InteractiveButton } from "../../../../ui/snippet/InteractiveButton"
import { useClipboard } from "../../../../utils/useClipboard"
import { SnippetFrame } from "../../../core/models"
import { useSnippetCreatorPageProvider } from "../SnippetCreatorPageProvider"
import { useLayoutProvider } from "../../../providers/LayoutProvider"

const FinalScreen = styled.div`
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

const required = (message: string): Validator<string> => value =>
  value === "" ? message : ""
const minLength = (
  limit: number,
  message: string
): Validator<string> => value =>
  value.length <= limit ? `${message} >= ${limit}` : ""
const maxLength = (
  limit: number,
  message: string
): Validator<string> => value =>
  value.length >= limit ? `${message} <= ${limit}` : ""

export const CreateSnippetForm = ({
  frames,
  onBack,
}: CreateSnippetFormProps) => {
  const creator = useSnippetCreatorPageProvider()
  const layout = useLayoutProvider()
  const { track } = useCustomGAEvent()
  const { copy } = useClipboard()

  const initialSetup = useMemo(
    () => ({
      values: {
        name: "",
        description: "",
        gifUrl: "http://localhost:8000/snippet-creator",
        generateGif: false,
      },
      validators: {
        name: [
          required(creator.t.sandbox.validation.required),
          minLength(
            SNIPPET_NAME_MIN_LENGTH,
            creator.t.sandbox.validation.length_must_be
          ),
          maxLength(
            SNIPPET_NAME_MAX_LENGTH,
            creator.t.sandbox.validation.length_must_be
          ),
        ],
        description: [
          required(creator.t.sandbox.validation.required),
          minLength(
            SNIPPET_DESCRIPTION_MIN_LENGTH,
            creator.t.sandbox.validation.length_must_be
          ),
          maxLength(
            SNIPPET_DESCRIPTION_MAX_LENGTH,
            creator.t.sandbox.validation.length_must_be
          ),
        ],
        gifUrl: [],
      },
    }),
    []
  )

  const [{ values, valid }, { set }] = useForm<FormData>(initialSetup)
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
    const link = `${layout.routes.snippet_creator.to}?id=${creationState.data}/`

    return (
      <Center>
        <FinalScreen className="col">
          <Section>
            <XL>{creator.t.sandbox.final.title}</XL>
            <M>
              {creator.t.sandbox.final.now_you_can_share}{" "}
              <A href={link} outside>
                {creator.t.sandbox.final.this_link}
              </A>
              .
            </M>
            <M>
              <B>{creator.t.sandbox.final.very_important}</B>
            </M>
            <InteractiveButton
              className="copy-snippet-link-btn"
              onClick={() => copy(window.location.origin + link)}
            >
              {status =>
                status === "pending" ? (
                  <>✂️ {layout.t.copied}</>
                ) : (
                  <>✂️ {creator.t.sandbox.final.copy_link}</>
                )
              }
            </InteractiveButton>
            <footer className="footer">
              <a className="button primary upper" href={link} target="_blank">
                {creator.t.sandbox.final.go_to_snippet}
              </a>
              <a
                className="button primary upper"
                href={layout.routes.snippet_creator.to}
                target="_blank"
              >
                {creator.t.sandbox.final.i_want_new}
              </a>
            </footer>
          </Section>
        </FinalScreen>
      </Center>
    )
  }

  return (
    <>
      {pending && <Alert message={layout.t.just_a_moment} />}
      <Center>
        <Container className="create-snippet-form" onSubmit={handleSubmit}>
          <XL>{creator.t.sandbox.add.title}</XL>
          <Field
            description={`(${
              SNIPPET_NAME_MIN_LENGTH + "-" + SNIPPET_NAME_MAX_LENGTH
            }) ${creator.t.sandbox.add.characters}`}
          >
            <Input
              autoFocus
              required
              placeholder={`${creator.t.sandbox.add.name}*`}
              value={values.name}
              onChange={e => set({ key: "name", value: e.target.value })}
            />
          </Field>
          <Field
            description={`(${
              SNIPPET_DESCRIPTION_MIN_LENGTH +
              "-" +
              SNIPPET_DESCRIPTION_MAX_LENGTH
            } ${creator.t.sandbox.add.characters})`}
          >
            <Textarea
              required
              value={values.description}
              placeholder={`${creator.t.sandbox.add.description}*`}
              onChange={e => set({ key: "description", value: e.target.value })}
            />
          </Field>

          <Divider className="submit-divider" horizontal />

          <FieldContainer className="submit-field row">
            <Button
              type="button"
              title={layout.t.back}
              disabled={pending}
              onClick={handleBack}
            >
              {layout.t.back}
            </Button>
            <Button
              className="submit-form-btn"
              type="submit"
              title={layout.t.confirm}
              disabled={pending || !valid}
            >
              {layout.t.confirm}
            </Button>
          </FieldContainer>

          {creationState.type === "fail" && (
            <M className="error">{layout.t.smth_wrong}</M>
          )}
        </Container>
      </Center>
    </>
  )
}
