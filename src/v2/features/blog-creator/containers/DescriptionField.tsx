import React from "react"
import { Field, Input } from "../../../../ui"
import { useBlogCreatorPageProvider } from "../BlogCreatorPageProvider"
import type { DescriptionFieldProps } from "./models"

const DescriptionField = ({ value, onChange }: DescriptionFieldProps) => {
  const creator = useBlogCreatorPageProvider()

  return (
    <Field description={creator.t.the_content_to_display}>
      <Input
        value={value}
        placeholder={creator.t.description}
        onChange={onChange}
      />
    </Field>
  )
}

export { DescriptionField }
