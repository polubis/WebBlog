export const prependWithSpaces = (code: string): string => {
  return code
    .split("\n")
    .map(part => (part === "" ? " " : part))
    .join("\n")
}
