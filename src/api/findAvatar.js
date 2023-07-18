exports.findAvatar = (avatars, identifier) => {
  const avatar = avatars.nodes.find(({ name }) => name === identifier)

  if (!avatar) {
    throw Error("Cannot find avatars for provided identifier: " + identifier)
  }

  return avatar
}
