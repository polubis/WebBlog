const { removeEdgeSlashes } = require("./removeEdgeSlashes")

const sort = materials => {
  return materials.sort((a, b) => {
    if (a.frontmatter.cdate > b.frontmatter.cdate) {
      return -1
    }

    if (a.frontmatter.cdate === b.frontmatter.cdate) {
      return 0
    }

    return 1
  })
}

exports.getMaterialsQuery = data => {
  const { materials, authors, authorsAvatars, technologiesAvatars } = data

  const techAvatarsMap = technologiesAvatars.nodes.reduce((acc, avatar) => {
    return {
      ...acc,
      [avatar.name]: avatar.childImageSharp.fluid,
    }
  }, {})

  const authorsMap = authors.reduce(
    (acc, author) => ({
      ...acc,
      [author.id]: author,
    }),
    {}
  )

  const sortedMaterials = sort(materials.nodes).map(material => {
    const materialAuthor = authorsAvatars.nodes.find(
      thumbnail => thumbnail.name === material.frontmatter.authorId
    )

    const author = {
      ...authorsMap[material.frontmatter.authorId],
      id: material.frontmatter.authorId,
      avatar: materialAuthor.childImageSharp.fluid,
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
