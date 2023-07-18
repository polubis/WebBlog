exports.getTechAvatarsMap = technologiesAvatars => {
  return technologiesAvatars.nodes.reduce(
    (acc, avatar) => ({
      ...acc,
      [avatar.name]: avatar.childImageSharp.fixed,
    }),
    {}
  )
}
