const { getArticleThumbnail } = require("./getArticleThumbnail")

const createLayout = ({ metadata, lang, meta, articles }) => {
  return {
    ...metadata[lang].layout,
    ...meta,
    articles: articles.slice(0, 16).map(({ title, slug, path }) => ({
      title,
      thumbnail: getArticleThumbnail(slug, articleThumbnails).medium,
      path,
    })),
  }
}

module.exports = {
  createLayout,
}
