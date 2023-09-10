import React from "react"
import { Popover } from "../components/Popover"
import { Field, IconButton, Input, S, Textarea } from "../../../../ui"
import { useClipboard } from "../../../../utils/useClipboard"
import { useBlogCreatorPageProvider } from "../BlogCreatorPageProvider"
import { useBlogCreatorAlertsProvider } from "../providers/BlogCreatorAlertsProvider"
import { PopoverContent } from "../components/PopoverContent"
import { useForm } from "../../../../utils/useForm"
import { useLayoutProvider } from "../../../providers/LayoutProvider"
import { EditableSnippet } from "../../../../ui/snippet/EditableSnippet"
import { CodeIcon } from "../../../../ui/icons/CodeIcon"
import { Language } from "prism-react-renderer"

interface Model {
  language: Language
  mdx: string
  static: boolean
  rolled: boolean
  description: string
  src: string
}

export const CodePopover = () => {
  const layout = useLayoutProvider()
  const { add } = useBlogCreatorAlertsProvider()
  const creator = useBlogCreatorPageProvider()
  const { copy } = useClipboard()

  const [{ values }, { set, reset }] = useForm<Model>({
    values: {
      mdx: creator.samples.static_code,
      static: true,
      rolled: false,
      description: "",
      src: "",
      language: "tsx",
    },
  })

  const handleConfirm = (): void => {
    // let value = creator.samples.image
    // const changed = values.description !== "" && values.url !== ""
    // if (changed) {
    //     add({
    //         message: creator.t.copied_and_paste_now,
    //     })
    // } else {
    //     add({
    //         message: creator.t.default_copied_and_paste_now,
    //     })
    // }
    // copy(value)
    // reset();
  }

  return (
    <Popover
      label={`${creator.t.add_code} - <Code />`}
      position={2}
      trigger={toggler => (
        <IconButton onClick={toggler.open}>
          <CodeIcon />
        </IconButton>
      )}
    >
      {toggler => (
        <PopoverContent>
          <>
            <Field description="Supported languages: tsx, jsx, md, html, css">
              <Input
                placeholder="Language*"
                value={values.language}
                onChange={value => {
                  set({
                    key: "language",
                    value: values.language,
                  })
                }}
              />
            </Field>

            <Input
              value={values.description}
              placeholder={`Description*`}
              onChange={e => set({ key: "description", value: e.target.value })}
            />

            <S>Make it rolled?</S>
            <input
              type="checkbox"
              onClick={() => set({ key: "rolled", value: !values.rolled })}
            />

            <S>Make it dynamic?</S>
            <input
              type="checkbox"
              onClick={() => set({ key: "static", value: !values.static })}
            />

            {values.static ? (
              <EditableSnippet
                language={values.language}
                value={values.mdx}
                onChange={value =>
                  set({
                    key: "mdx",
                    value,
                  })
                }
              />
            ) : (
              <Input
                value={values.language}
                onChange={value => {
                  set({
                    key: "src",
                    value: values.src,
                  })
                }}
              />
            )}

            <S>{creator.t.skip_edition_disclaimer}</S>
          </>

          <button
            className="upper button primary"
            onClick={() => {
              handleConfirm()
              toggler.close()
            }}
          >
            {layout.t.copy}
          </button>
        </PopoverContent>
      )}
    </Popover>
  )
}
