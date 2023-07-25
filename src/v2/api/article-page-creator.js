const { createUser } = require("./createUser")
const { getArticleThumbnail } = require("./getArticleThumbnail")
const { sortByDates } = require("./sortByDates")
const meta = require("../core/meta.json")
const article_en = require("../translation/article/en.json")
const layout_en = require("../translation/layout/en.json")
const article_pl = require("../translation/article/pl.json")
const layout_pl = require("../translation/layout/pl.json")
const { createTechnologies } = require("./createTechnologies")

const metadata = {
  en: {
    layout: {
      t: layout_en,
      lang: meta.langs.en,
      lang_alternate: meta.langs.pl,
    },
    article: {
      t: article_en,
    },
  },
  pl: {
    layout: {
      t: layout_pl,
      lang: meta.langs.pl,
      lang_alternate: meta.langs.en,
    },
    article: {
      t: article_pl,
    },
  },
}

const ArticlePageCreator = ({ createPage }) => ({
  makeComponent,
  makeSlug,
  makeGaPage,
  makeSourceUrl,
  makeTranslationPath,
  makePath,
}) => ({
  articles,
  authorsAvatars,
  articleThumbnails,
  technologiesAvatars,
  authors,
}) => {
  const sortedArticles = sortByDates(articles)

  const data = sortedArticles.map((article, index) => {
    const { body } = article
    const slug = makeSlug(article)
    const {
      langs,
      cdate,
      mdate,
      title,
      lang,
      tags,
      seniorityLevel,
      description,
      readTime,
      stack,
      authorId,
      treviewerId,
      lreviewerId,
    } = article.frontmatter

    const path = makePath({ slug })
    const articlePageObject = {
      author: createUser(authorId, authors, authorsAvatars),
      tech_reviewer: createUser(treviewerId, authors, authorsAvatars),
      ling_reviewer: createUser(lreviewerId, authors, authorsAvatars),
      thumbnail: getArticleThumbnail(slug, articleThumbnails),
      t: metadata[lang].article.t,
      cdate,
      mdate,
      lang,
      title,
      tags,
      seniority: seniorityLevel,
      description,
      body,
      url: meta.site_url + path,
      read_time: readTime,
      slug,
      path: makePath({ slug }),
      ga_page: makeGaPage({ slug }),
      source_url: makeSourceUrl({ slug, meta }),
      is_new: index === 0,
      technologies: createTechnologies(stack, technologiesAvatars),
    }

    if (Array.isArray(langs) && langs.length > 0) {
      articlePageObject.translation_path = makeTranslationPath({ slug })
    }

    const prev = sortedArticles[index - 1]
    const next = sortedArticles[index + 1]

    if (prev) {
      const slug = makeSlug(prev)

      articlePageObject.prev = {
        title: prev.frontmatter.title,
        thumbnail: getArticleThumbnail(slug, articleThumbnails).medium,
        path: makePath({ slug }),
      }
    }

    if (next) {
      const slug = makeSlug(next)

      articlePageObject.next = {
        title: next.frontmatter.title,
        thumbnail: getArticleThumbnail(slug, articleThumbnails).medium,
        path: makePath({ slug }),
      }
    }

    return articlePageObject
  })

  const { lang } = data[0]

  data.forEach(article => {
    createPage({
      path: article.path,
      component: makeComponent(),
      context: {
        article,
        layout: {
          ...metadata[lang].layout,
          ...meta,
          articles: data.slice(0, 16).map(({ title, slug, path }) => ({
            title,
            thumbnail: getArticleThumbnail(slug, articleThumbnails).medium,
            path,
          })),
        },
      },
    })
  })
}

module.exports = {
  ArticlePageCreator,
}
