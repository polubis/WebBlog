export const removeEdgeSlashes = (str: string): string => {
  const parts = str.split("/")
  str.startsWith("/") && parts.shift()
  str.endsWith("/") && parts.pop()
  return parts.join("/")
}
