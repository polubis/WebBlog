const { findAvatar } = require("./findAvatar")
const { getTechAvatarsMap } = require("./getTechAvatarsMap")
const { removeEdgeSlashes } = require("./removeEdgeSlashes")
const { sortByDates } = require("./sortByDates")

const getSlug = relativePath => {
  const parts = relativePath.split("/")
  const filtered = parts.filter((_, i) => i !== 0 && i < parts.length - 1)
  return `${filtered.join("/")}/`
}

exports.getArticlesQuery = data => {
  const {
    articles,
    articleThumbnails,
    authors,
    technologiesAvatars,
    authorsAvatars,
  } = data

  const techAvatarsMap = getTechAvatarsMap(technologiesAvatars)

  const thumbnailsMap = articleThumbnails.nodes.reduce((acc, node) => {
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

  const sortedArticles = sortByDates(articles.nodes).map((article, idx) => {
    const authorAvatar = findAvatar(
      authorsAvatars,
      article.frontmatter.authorId
    )
    const lingReviewerAvatar = findAvatar(
      authorsAvatars,
      article.frontmatter.lreviewerId
    )
    const techReviewerAvatar = findAvatar(
      authorsAvatars,
      article.frontmatter.treviewerId
    )

    const lingReviewer = {
      ...authorsMap[article.frontmatter.lreviewerId],
      id: article.frontmatter.lreviewerId,
      avatar: lingReviewerAvatar,
    }
    const techReviewer = {
      ...authorsMap[article.frontmatter.treviewerId],
      id: article.frontmatter.treviewerId,
      avatar: techReviewerAvatar,
    }
    const author = {
      ...authorsMap[article.frontmatter.authorId],
      id: article.frontmatter.authorId,
      avatar: authorAvatar,
    }

    const path = `/articles/${article.slug.substring(
      0,
      article.slug.length - 1
    )}/`

    const langs = Array.isArray(article.frontmatter.langs)
      ? article.frontmatter.langs
      : []

    const lang = "en"

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
      translations: langs.map(lang => ({
        lang,
        path: `/${lang}${path}`,
      })),
      gaPage: removeEdgeSlashes(path),
      path,
      thumbnail: thumbnailsMap[article.slug],
      stack: article.frontmatter.stack.split(",").map(id => ({
        id,
        avatar: techAvatarsMap[id],
      })),
      createdAt: article.frontmatter.cdate,
      modifiedAt: article.frontmatter.mdate,
      lang,
      seniorityLevel: article.frontmatter.seniorityLevel,
    }
  })

  return sortedArticles.map((article, idx, arr) => ({
    ...article,
    previous: arr[idx - 1],
    next: arr[idx + 1],
  }))
}
