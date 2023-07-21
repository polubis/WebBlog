const createUser = (authorId, authors, authorsAvatars) => {
  const author = authors.find(({ id }) => id === authorId)

  if (!author) throw Error("Cannot find user")

  const avatar = authorsAvatars.find(({ name }) => name === authorId)

  if (!avatar) throw Error("Cannot find avatar")

  const {
    id,
    bio,
    role,
    firstName,
    lastName,
    platformRoles,
    name,
    githubURL,
    linkedinURL,
  } = author

  return {
    id,
    bio,
    role,
    name,
    avatar: {
      tiny: avatar.tiny.fixed,
      small: avatar.small.fixed,
      medium: avatar.medium.fixed,
      big: avatar.big.fixed,
    },
    platform_roles: platformRoles,
    first_name: firstName,
    last_name: lastName,
    linkedin_url: linkedinURL,
    github_url: githubURL,
    full_name: firstName + " " + lastName,
  }
}

module.exports = { createUser }
