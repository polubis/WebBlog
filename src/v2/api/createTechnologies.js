const findAvatar = (id, technologiesAvatars) => {
  const avatar = technologiesAvatars.find(({ name }) => name === id)

  if (!avatar) throw Error("Cannot find technology avatar")

  return avatar
}

const createTechnologies = (stack, technologiesAvatars) => {
  return stack.split(",").map(id => ({
    id,
    avatar: findAvatar(id, technologiesAvatars).childImageSharp.fixed,
  }))
}

module.exports = { createTechnologies }
