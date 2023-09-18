const { getArticleThumbnail } = require("./getArticleThumbnail")
const meta = require("../core/meta.json")
const layout_en = require("../translation/layout/en.json")
const layout_pl = require("../translation/layout/pl.json")

const metadata = {
  en: {
    t: layout_en,
    lang: meta.langs.en,
    lang_alternate: meta.langs.pl,
  },
  pl: {
    t: layout_pl,
    lang: meta.langs.pl,
    lang_alternate: meta.langs.en,
  },
}

const createRoutes = (lang, meta) => {
  if (lang === meta.langs.pl.key) {
    return Object.entries(meta.routes).reduce((acc, [routeKey, routeValue]) => {
      return {
        ...acc,
        [routeKey]: {
          ...routeValue,
          to:
            routeValue.to === "/"
              ? `/${meta.langs.pl.key}/`
              : "/" + meta.langs.pl.key + routeValue.to,
          gaPage: meta.langs.pl.key + "/" + routeValue.gaPage,
        },
      }
    }, {})
  }

  return meta.routes
}

const createLayout = ({ lang, articles, articleThumbnails }) => {
  return {
    ...metadata[lang],
    ...meta,
    routes: createRoutes(lang, meta),
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
