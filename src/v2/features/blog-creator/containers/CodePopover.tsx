import React, { ChangeEventHandler, useMemo, useState } from "react"
import { Popover } from "../components/Popover"
import { Field, IconButton, Input, M, Modal } from "../../../../ui"
import { useClipboard } from "../../../../utils/useClipboard"
import { useBlogCreatorPageProvider } from "../BlogCreatorPageProvider"
import { useBlogCreatorAlertsProvider } from "../providers/BlogCreatorAlertsProvider"
import { PopoverContent } from "../components/PopoverContent"
import { useForm } from "../../../../utils/useForm"
import { useLayoutProvider } from "../../../providers/LayoutProvider"
import { CodeIcon } from "../../../../ui/icons/CodeIcon"
import { Tabs } from "../../../ui/tabs/Tabs"
import { Tab } from "../../../ui/tabs/Tab"
import { useSnippetLoad } from "../logic/useSnippetLoad"
import { Select } from "../../../ui/select/Select"
import { Language } from "prism-react-renderer"
import { SelectOption } from "../../../ui/select/models"
import styled from "styled-components"
import { useToggle } from "../../../utils/useToggle"
import { Code } from "../../../ui/code/Code"
import { CodePopoverStaticForm } from "./CodePopoverStaticForm"

const TabsWrapper = styled.div`
  padding-bottom: 12px;
`

const modes = ["Static", "Dynamic"] as const

type Mode = typeof modes[number]

interface Model {
  language: Language
  code: string
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

const createCodeSnippet = (mode: Mode, model: Model): string => {
  const parts = [
    "<Code",
    `mode="${mode.toLowerCase()}"`,
    `lang="${model.language}"`,
  ]

  if (model.description) {
    parts.push(`description="${model.description}"`)
  }

  if (model.rolled) {
    parts.push("rolled")
  }

  if (mode === "Dynamic") {
    parts.push(`src="${model.src}"`)
    parts.push(`linesCount={${countLinesOfCode(model.code)}}`)
    parts.push("/>")
  }

  if (mode === "Static") {
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

  const [mode, setMode] = useState<Mode>("Static")

  const initial_model: Model = useMemo(
    () => ({
      code: creator.t.paste_your_snippet,
      rolled: false,
      description: "",
      src: "",
      language: "tsx",
    }),
    []
  )

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

  const handleCopyConfirm = (toggler: { close: () => void }): void => {
    add({ message: creator.t.copied_and_paste_now })
    copy(createCodeSnippet(mode, values))
    reset()
    toggler.close()
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
                  {modes.map(currentMode => (
                    <Tab
                      key={currentMode}
                      active={currentMode === mode}
                      onClick={() => setMode(currentMode)}
                    >
                      <M>{currentMode}</M>
                    </Tab>
                  ))}
                </Tabs>
              </TabsWrapper>

              {mode === "Static" && <CodePopoverStaticForm />}

              {mode === "Dynamic" && (
                <>
                  {SrcField}
                  {LanguageField}
                  {DescriptionField}
                  {/* {RolledField} */}
                </>
              )}
            </>
          </PopoverContent>
        )}
      </Popover>
      {previewModal.opened && (
        <Modal onClose={previewModal.close}>
          <Code lang={values.language} mode="static">
            {values.code}
          </Code>
        </Modal>
      )}
    </>
  )
}
