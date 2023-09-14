import React from "react"
import { Language } from "prism-react-renderer"
import { Field } from "../../../../ui"
import { Select } from "../../../ui/select/Select"
import { useBlogCreatorPageProvider } from "../BlogCreatorPageProvider"
import { SelectOption } from "../../../ui/select/models"
import { LanguageFieldProps } from "./models"

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

const languages_options = languages.map<SelectOption<Language>>(lang => ({
  key: lang,
  child: lang,
}))

const LanguageField = ({ value, loading, onChange }: LanguageFieldProps) => {
  const creator = useBlogCreatorPageProvider()

  return (
    <Field
      description={
        loading
          ? creator.t.trying_to_detect
          : `${[...languages].slice(0, 6).join(", ")}...`
      }
    >
      <Select
        options={languages_options}
        placeholder={creator.t.language}
        value={value}
        onChange={onChange}
      />
    </Field>
  )
}

export { LanguageField }
