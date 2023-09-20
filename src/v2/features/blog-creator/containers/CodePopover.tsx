import React, { ChangeEventHandler, useMemo } from "react"
import { Popover } from "../components/Popover"
import { Field, IconButton, Input, M, Modal, S } from "../../../../ui"
import { useClipboard } from "../../../../utils/useClipboard"
import { useBlogCreatorPageProvider } from "../BlogCreatorPageProvider"
import { useBlogCreatorAlertsProvider } from "../providers/BlogCreatorAlertsProvider"
import { PopoverContent } from "../components/PopoverContent"
import { useForm } from "../../../../utils/useForm"
import { useLayoutProvider } from "../../../providers/LayoutProvider"
import { EditableSnippet } from "../../../../ui/snippet/EditableSnippet"
import { CodeIcon } from "../../../../ui/icons/CodeIcon"
import { Tabs } from "../../../ui/tabs/Tabs"
import { Tab } from "../../../ui/tabs/Tab"
import { useSnippetLoad } from "../logic/useSnippetLoad"
import { Select } from "../../../ui/select/Select"
import type { Language } from "prism-react-renderer"
import { SelectOption } from "../../../ui/select/models"
import styled from "styled-components"
import { useToggle } from "../../../utils/useToggle"
import { Code } from "../../../ui/code/Code"

const TabsWrapper = styled.div`
  padding-bottom: 12px;
`

const EditableSnippetWrapper = styled.div`
  .ui-editable-snippet {
    border-radius: 4px;
    min-height: 44px;
  }
`

const modes = ["Static", "Dynamic"] as const

type Mode = typeof modes[number]

interface Model {
  language: Language
  code: string
  mode: Mode
  rolled: boolean
  description: string
  src: string
}

const languages = [
  "markup",
  "bash",
  "clike",
  "c",
  "cpp",
  "css",
  "javascript",
  "jsx",
  "coffeescript",
  "actionscript",
  "css-extr",
  "diff",
  "git",
  "go",
  "graphql",
  "handlebars",
  "json",
  "less",
  "makefile",
  "markdown",
  "objectivec",
  "ocaml",
  "python",
  "reason",
  "sass",
  "scss",
  "sql",
  "stylus",
  "tsx",
  "typescript",
  "wasm",
  "yaml",
].sort() as Language[]

const languages_options = languages.map<SelectOption>(lang => ({
  key: lang,
  child: lang,
}))

const removeStartEndEnters = (value: string): string =>
  value.trimStart().trimEnd()

const countLinesOfCode = (code: string): number =>
  removeStartEndEnters(code).split("\n").length

const createCodeSnippet = (model: Model): string => {
  const parts = [
    "<Code",
    `mode="${model.mode.toLowerCase()}"`,
    `lang="${model.language}"`,
  ]

  if (model.description) {
    parts.push(`description="${model.description}"`)
  }

  if (model.rolled) {
    parts.push("rolled")
  }

  if (model.mode === "Dynamic") {
    parts.push(`src="${model.src}"`)
    parts.push(`linesCount={${countLinesOfCode(model.code)}}`)
    parts.push("/>")
  }

  if (model.mode === "Static") {
    const parsedCode = model.code.replace(/`/g, "\\`")
    parts.push(">")
    parts.push(`{\`${parsedCode}\`}`)
    parts.push("</Code>")
  }

  return parts.join("\n")
}

const getLanguageFromSrc = (src: string): Language | null => {
  const extension = src.split("/").pop()?.split(".").pop()

  if (languages.some(lang => lang === extension)) {
    return extension as Language
  }

  return null
}

export const CodePopover = () => {
  const layout = useLayoutProvider()
  const { add } = useBlogCreatorAlertsProvider()
  const creator = useBlogCreatorPageProvider()
  const { copy } = useClipboard()
  const previewModal = useToggle()

  const initial_model: Model = useMemo(() => ({
    code: creator.t.paste_your_snippet,
    rolled: false,
    mode: "Static",
    description: "",
    src: "",
    language: "tsx",
  }), [])

  const [{ values }, { set, reset }] = useForm<Model>({
    values: initial_model,
  })

  const srcDescriptions = useMemo(
    () => ({
      busy: creator.t.loading_snippet,
      ok: creator.t.snippet_is_loaded,
      fail: creator.t.snippet_load_failed,
      idle: creator.t.snippet_idle,
    }),
    []
  )

  const snippet = useSnippetLoad({
    onLoad: code => {
      set({ key: "code", value: removeStartEndEnters(code) })
    },
  })

  const handleConfirm = (): void => {
    let value = createCodeSnippet(values)
    const { src, mode, ...currentValues } = values
    const { src: a, mode: b, ...initialValues } = initial_model
    const changed =
      JSON.stringify(initialValues) !== JSON.stringify(currentValues)

    if (changed) {
      add({
        message: creator.t.copied_and_paste_now,
      })
    } else {
      add({
        message: creator.t.default_copied_and_paste_now,
      })
    }
    copy(value)
    reset()
  }

  const handleModeChange = (mode: Mode): void => {
    set({ key: "mode", value: mode })
  }

  const handleSrcChange: ChangeEventHandler<HTMLInputElement> = e => {
    const { value } = e.target

    set({ key: "src", value })

    if (value.trim()) {
      snippet.load(value)

      const langauge = getLanguageFromSrc(value)

      if (langauge) {
        set({ key: "language", value: langauge })
      }

      return
    }

    snippet.reset()
  }

  const SrcField = (
    <Field
      description={srcDescriptions[snippet.is]}
      onClick={snippet.is === "ok" ? previewModal.open : undefined}
    >
      <Input
        value={values.src}
        placeholder={creator.t.snippet_url}
        onChange={handleSrcChange}
      />
    </Field>
  )
  const DescriptionField = (
    <Field description={creator.t.the_content_to_display}>
      <Input
        value={values.description}
        placeholder={creator.t.description}
        onChange={e => set({ key: "description", value: e.target.value })}
      />
    </Field>
  )
  const LanguageField = (
    <Field
      description={
        snippet.is === "busy"
          ? creator.t.trying_to_detect
          : `${[...languages].slice(0, 6).join(", ")}...`
      }
    >
      <Select
        options={languages_options}
        placeholder={creator.t.language}
        value={values.language}
        onChange={language => {
          set({
            key: "language",
            value: language as Language,
          })
        }}
      />
    </Field>
  )
  // const RolledField = (
  //   <>
  //     <S>Make it rolled?</S>
  //     <input
  //       type="checkbox"
  //       onClick={() => set({ key: "rolled", value: !values.rolled })}
  //     />
  //   </>
  // )

  return (
    <>
      <Popover
        disabled={previewModal.opened}
        label={`${creator.t.add_code} - <Code />`}
        position={2}
        trigger={toggler => (
          <IconButton title={creator.t.add_code} onClick={toggler.open}>
            <CodeIcon />
          </IconButton>
        )}
      >
        {toggler => (
          <PopoverContent>
            <>
              <TabsWrapper>
                <Tabs>
                  {modes.map(mode => (
                    <Tab
                      key={mode}
                      active={mode === values.mode}
                      onClick={() => handleModeChange(mode)}
                    >
                      <M>{mode}</M>
                    </Tab>
                  ))}
                </Tabs>
              </TabsWrapper>

              {values.mode === "Static" && (
                <>
                  <Field description={creator.t.paste_your_snippet}>
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

                  {LanguageField}
                  {DescriptionField}
                  {/* {RolledField} */}
                </>
              )}

              {values.mode === "Dynamic" && (
                <>
                  {SrcField}
                  {LanguageField}
                  {DescriptionField}
                  {/* {RolledField} */}
                </>
              )}

              <S>{creator.t.skip_edition_disclaimer}</S>
            </>

            <button
              className="upper button primary"
              disabled={snippet.is === "busy"}
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
      {previewModal.opened && (
        <Modal onClose={previewModal.close}>
          <Code lang={values.language} mode="static">{values.code}</Code>
        </Modal>
      )}
    </>
  )
}
