exports.serializeToAuthors = data => {
  const authors = data.authors.map(author => {
    const foundNode = data.authorsAvatars.nodes.find(
      node => node.name === author.id
    )

    if (!foundNode) {
      throw new Error("Lack of avatar for given user")
    }

    return {
      ...author,
      avatar: foundNode.childImageSharp.fluid,
    }
  })

  return authors
}
