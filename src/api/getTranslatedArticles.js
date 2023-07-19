const { findAvatar } = require("./findAvatar")
const { getTechAvatarsMap } = require("./getTechAvatarsMap")
const { removeEdgeSlashes } = require("./removeEdgeSlashes")
const { sortByDates } = require("./sortByDates")

const getSlug = relativePath => {
  const parts = relativePath.split("/")
  const filtered = parts.filter((_, i) => i !== 0 && i < parts.length - 1)
  return `${filtered.join("/")}/`
}

exports.getTranslatedArticles = data => {
  const {
    translatedArticles,
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

  const sortedArticles = sortByDates(translatedArticles.nodes)
    .map(article => {
      const [categoryDir, articleDir, translationFileName] = article.slug.split(
        "/"
      )
      const slug = `${categoryDir}/${articleDir}/`
      const lang = translationFileName.split("-").pop()

      return {
        ...article,
        slug,
        lang,
        path: `/${lang}/articles/${slug}`,
      }
    })
    .map((article, idx) => {
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
      const { path, slug, body, lang } = article

      const langs = Array.isArray(article.frontmatter.langs)
        ? article.frontmatter.langs
        : []

      return {
        slug,
        body,
        description: article.frontmatter.description,
        title: article.frontmatter.title,
        readTime: article.frontmatter.readTime,
        tags: article.frontmatter.tags,
        isNew: idx === 0,
        lingReviewer,
        author,
        techReviewer,
        gaPage: removeEdgeSlashes(path),
        path,
        thumbnail: thumbnailsMap[slug],
        stack: article.frontmatter.stack.split(",").map(id => ({
          id,
          avatar: techAvatarsMap[id],
        })),
        createdAt: article.frontmatter.cdate,
        modifiedAt: article.frontmatter.mdate,
        originalArticlePath: path.replace(`/${lang}`, ""),
        lang,
        seniorityLevel: article.frontmatter.seniorityLevel,
        translations: langs.map(lang => ({
          lang,
          path: `/articles/${slug}`.replace(`/${lang}`, ""),
        })),
      }
    })

  return sortedArticles
}
