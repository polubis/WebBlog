import React, { useMemo } from "react"
import { useForm } from "../../../../utils/useForm"
import type { Language } from "prism-react-renderer"
import { Field, Modal } from "../../../../ui"
import styled from "styled-components"
import { useBlogCreatorPageProvider } from "../BlogCreatorPageProvider"
import { EditableSnippet } from "../../../../ui/snippet/EditableSnippet"
import { LanguageField } from "./LanguageField"
import { DescriptionField } from "./DescriptionField"
import { required } from "../../../../utils/validators"
import { useLayoutProvider } from "../../../providers/LayoutProvider"
import { useToggle } from "../../../utils/useToggle"
import { Code } from "../../../ui/code/Code"

interface Model {
  language: Language
  code: string
  rolled: boolean
  description: string
}

const EditableSnippetWrapper = styled.div`
  .ui-editable-snippet {
    border-radius: 4px;
    min-height: 44px;
  }
`

const CodePopoverStaticForm = () => {
  const layout = useLayoutProvider()
  const creator = useBlogCreatorPageProvider()
  const modal = useToggle()

  const initial_model: Model = useMemo(
    () => ({
      code: creator.t.paste_your_snippet,
      rolled: false,
      description: "",
      language: "tsx",
    }),
    []
  )

  const [{ values, errors, invalid }, { set }] = useForm<Model>({
    values: initial_model,
    validators: {
      code: [required("required")],
    },
  })

  return (
    <>
      <Field
        onClick={errors.code ? undefined : modal.open}
        description={
          errors.code ? "Field is required" : creator.t.paste_your_snippet
        }
      >
        <EditableSnippetWrapper>
          <EditableSnippet
            language={values.language ?? "tsx"}
            value={values.code}
            onChange={value =>
              set({
                key: "code",
                value,
              })
            }
          />
        </EditableSnippetWrapper>
      </Field>

      <DescriptionField
        value={values.description}
        onChange={e => set({ key: "description", value: e.target.value })}
      />

      <LanguageField
        value={values.language}
        onChange={value => set({ key: "language", value })}
      />

      <footer className="footer">
        <button
          className="upper button primary"
          disabled={invalid}
          onClick={() => {
            // handleCopyConfirm(toggler)
          }}
        >
          {layout.t.copy}
        </button>

        <button
          className="upper button primary"
          onClick={() => {
            // Use example.
          }}
        >
          {creator.t.use_example}
        </button>
      </footer>

      {modal.opened && (
        <Modal onClose={modal.close}>
          <Code lang={values.language} mode="static">
            {values.code}
          </Code>
        </Modal>
      )}
    </>
  )
}

export { CodePopoverStaticForm }
