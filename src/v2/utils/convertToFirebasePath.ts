const convertToFirebasePath = (path: string): string => {
  const parts = path.replace(/\//g, "-").split("-")
  parts.pop()
  parts.shift()

  return parts.join("-")
}

export { convertToFirebasePath }
