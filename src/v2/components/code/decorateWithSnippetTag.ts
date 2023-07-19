import { prependWithSpaces } from "./prependWithSpaces"

export const decorateWithSnippetTag = (code: string): string => {
  return `<Snippet description=" ">{\`${prependWithSpaces(code)}\`}</Snippet>`
}
