const { formatDistanceStrict } = require("date-fns")
const article_en = require("../v2/translation/article/en.json")
const layout_en = require("../v2/translation/layout/en.json")
const article_pl = require("../v2/translation/article/pl.json")
const layout_pl = require("../v2/translation/layout/pl.json")
const meta = require("../v2/core/meta.json")

exports.createArticlePageCtx = ({ article, articles }) => {
  const metadata = {
    en: {
      layout: {
        t: layout_en,
        lang: meta.langs.en,
      },
      article: {
        t: article_en,
      },
    },
    pl: {
      layout: {
        t: layout_pl,
        lang: meta.langs.pl,
      },
      article: {
        t: article_pl,
      },
    },
  }

  return {
    layout: {
      ...metadata[article.lang].layout,
      articles: articles
        .map(({ title, thumbnail, path }) => ({
          title,
          thumbnail,
          path,
        }))
        .slice(0, 16),
      meta,
    },
    article: {
      ...metadata[article.lang].article,
      article,
      author: article.author.firstName + " " + article.author.lastName,
      dates: {
        updated: `updated: ${formatDistanceStrict(
          new Date(article.modifiedAt),
          new Date()
        )} ago`,
        created: `created: ${formatDistanceStrict(
          new Date(article.createdAt),
          new Date()
        )} ago`,
      },
    },
  }
}
