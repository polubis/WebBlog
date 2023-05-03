import React from "react"
import { Select } from "../Select/Select"
import { INIT_MDX, smallMDX, mediumMDX, hugeMDX } from "./config"

interface TemplateSelectorProps {
  change: (mdx: string) => void
}

export default function TemplateSelector({ change }: TemplateSelectorProps) {
  const handleTemplateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    switch (value) {
      case "smallMDX":
        change(smallMDX)
        break
      case "mediumMDX":
        change(mediumMDX)
        break
      case "hugeMDX":
        change(hugeMDX)
        break
      default:
        change(INIT_MDX)
    }
  }

  return (
    <Select onChange={e => handleTemplateChange(e)}>
      <option value={"default"}>Default</option>
      <option value={"smallMDX"}>Small</option>
      <option value={"mediumMDX"}>Medium</option>
      <option value={"hugeMDX"}>Huge</option>
    </Select>
  )
}
