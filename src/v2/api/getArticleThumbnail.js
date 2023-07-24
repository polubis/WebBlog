const getArticleThumbnail = (slug, articleThumbnails) => {
  const thumbnailPath = "thumbnails/" + slug + "/thumbnail.jpg"
  const thumbnail = articleThumbnails.find(
    ({ relativePath }) => relativePath === thumbnailPath
  )

  return {
    full: thumbnail.full.fluid,
    medium: thumbnail.medium.fixed,
  }
}

const getPlArticleSlug = article => {
  let slug = article.slug.replace(article.slug.split("/").pop(), "")
  slug = slug.substring(0, slug.length - 1)
  return slug
}

const getEnArticleSlug = article => {
  return article.slug.substring(0, article.slug.length - 1)
}

module.exports = {
  getArticleThumbnail,
  getPlArticleSlug,
  getEnArticleSlug
}
