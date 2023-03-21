const getSlug = relativePath => {
  const parts = relativePath.split("/")
  const filtered = parts.filter((_, i) => i !== 0 && i < parts.length - 1)
  return `${filtered.join("/")}/`
}

const sort = articles => {
  return articles.sort((a, b) => {
    if (a.frontmatter.cdate > b.frontmatter.cdate) {
      return -1
    }

    if (a.frontmatter.cdate === b.frontmatter.cdate) {
      return 0
    }

    return 1
  })
}

exports.getArticlesQuery = data => {
  const {
    articles,
    thumbnails,
    authors,
    technologiesAvatars,
    authorsAvatars,
  } = data

  const techAvatarsMap = technologiesAvatars.nodes.reduce((acc, avatar) => {
    return {
      ...acc,
      [avatar.name]: avatar.childImageSharp.fluid,
    }
  }, {})

  const thumbnailsMap = thumbnails.nodes.reduce((acc, node) => {
    return {
      ...acc,
      [getSlug(node.relativePath)]: node.childImageSharp.fluid,
    }
  }, {})

  const authorsMap = authors.reduce(
    (acc, author) => ({
      ...acc,
      [author.id]: author,
    }),
    {}
  )

  return sort(articles.nodes).map((article, idx) => {
    const authorAvatar = authorsAvatars.nodes.find(
      thumbnail => thumbnail.name === article.frontmatter.authorId
    )
    const lingReviewerAvatar = authorsAvatars.nodes.find(
      thumbnail => thumbnail.name === article.frontmatter.lreviewerId
    )
    const techReviewerAvatar = authorsAvatars.nodes.find(
      thumbnail => thumbnail.name === article.frontmatter.treviewerId
    )
    const lingReviewer = {
      ...authorsMap[article.frontmatter.lreviewerId],
      id: article.frontmatter.lreviewerId,
      avatar: lingReviewerAvatar.childImageSharp.fluid,
    }
    const techReviewer = {
      ...authorsMap[article.frontmatter.treviewerId],
      id: article.frontmatter.treviewerId,
      avatar: techReviewerAvatar.childImageSharp.fluid,
    }
    const author = {
      ...authorsMap[article.frontmatter.authorId],
      id: article.frontmatter.authorId,
      avatar: authorAvatar.childImageSharp.fluid,
    }

    return {
      slug: article.slug,
      body: article.body,
      description: article.frontmatter.description,
      title: article.frontmatter.title,
      readTime: article.frontmatter.readTime,
      tags: article.frontmatter.tags,
      isNew: idx === 0,
      lingReviewer,
      author,
      techReviewer,
      graphicAuthorLink: article.frontmatter.graphicauthor,
      path: `/articles/${article.slug.substring(0, article.slug.length - 1)}/`,
      thumbnail: thumbnailsMap[article.slug],
      stack: article.frontmatter.stack.split(",").map(id => ({
        id,
        avatar: techAvatarsMap[id],
      })),
      createdAt: article.frontmatter.cdate,
      modifiedAt: article.frontmatter.mdate,
      toBeContinuedDate: article.frontmatter.tbcdate,
    }
  })
}
