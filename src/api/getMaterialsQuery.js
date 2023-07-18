const { findAvatar } = require("./findAvatar")
const { removeEdgeSlashes } = require("./removeEdgeSlashes")
const { sortByDates } = require("./sortByDates")

exports.getMaterialsQuery = data => {
  const { materials, authors, authorsAvatars, technologiesAvatars } = data

  const techAvatarsMap = technologiesAvatars.nodes.reduce((acc, avatar) => {
    return {
      ...acc,
      [avatar.name]: avatar.childImageSharp.fixed,
    }
  }, {})

  const authorsMap = authors.reduce(
    (acc, author) => ({
      ...acc,
      [author.id]: author,
    }),
    {}
  )

  const sortedMaterials = sortByDates(materials.nodes).map(material => {
    const author = {
      ...authorsMap[material.frontmatter.authorId],
      id: material.frontmatter.authorId,
      avatar: findAvatar(authorsAvatars, material.frontmatter.authorId),
    }

    const path = `/materials/${material.slug.split("/").reverse().pop()}/`

    return {
      path,
      author,
      slug: material.slug,
      body: material.body,
      description: material.frontmatter.description,
      title: material.frontmatter.title,
      tags: material.frontmatter.tags,
      gaPage: removeEdgeSlashes(path),
      stack: material.frontmatter.stack.split(",").map(id => ({
        id,
        avatar: techAvatarsMap[id],
      })),
      createdAt: material.frontmatter.cdate,
      modifiedAt: material.frontmatter.mdate,
    }
  })

  return sortedMaterials
}
