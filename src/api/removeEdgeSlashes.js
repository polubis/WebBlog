exports.removeEdgeSlashes = str => {
  const parts = str.split("/")
  str.startsWith("/") && parts.shift()
  str.endsWith("/") && parts.pop()
  return parts.join("/")
}
