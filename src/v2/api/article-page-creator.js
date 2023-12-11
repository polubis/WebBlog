const { createUser } = require("./createUser")
const { getArticleThumbnail } = require("./getArticleThumbnail")
const { sortByDates } = require("./sortByDates")
const meta = require("../core/meta.json")
const article_en = require("../translation/article/en.json")
const article_pl = require("../translation/article/pl.json")
const { createLayout } = require("./create-layout")

const ArticlePageCreator = ({ createPage }) => ({
  makeComponent,
  makeSlug,
  makeGaPage,
  makeSourceUrl,
  makeTranslationPath,
  makePath,
  rates,
  votes,
}) => async ({
  articles,
  authorsAvatars,
  articleThumbnails,
  technologiesAvatars,
  authors,
}) => {
  const sortedArticles = sortByDates(articles)
  const articleTranslations = {
    pl: article_pl,
    en: article_en,
  }

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
    const author = createUser(authorId, authors, authorsAvatars)
    const tech_reviewer = createUser(treviewerId, authors, authorsAvatars)
    const ling_reviewer = createUser(lreviewerId, authors, authorsAvatars)
    const ga_page = makeGaPage({ slug })

    const firebasePathParts = path.replace(/\//g, "-").split("-")
    firebasePathParts.pop()
    firebasePathParts.shift()
    const fireBasePath = firebasePathParts.join("-")

    const articlePageObject = {
      author: {
        ...author,
        avatar: {
          medium: author.avatar.medium,
          small: author.avatar.small,
        },
      },
      tech_reviewer: {
        ...tech_reviewer,
        avatar: {
          small: tech_reviewer.avatar.small,
        },
      },
      ling_reviewer: {
        ...ling_reviewer,
        avatar: {
          small: ling_reviewer.avatar.small,
        },
      },
      thumbnail: getArticleThumbnail(slug, articleThumbnails),
      t: articleTranslations[lang],
      cdate,
      mdate,
      lang,
      title,
      tags: tags.split(","),
      seniority: seniorityLevel,
      description,
      rate: rates[fireBasePath],
      vote: {
        is: "idle",
        vote: votes[fireBasePath] ?? { positive: 0, negative: 0 },
      },
      comments: {
        is: "idle",
      },
      resourcePath: fireBasePath,
      body,
      url: meta.site_url + path,
      duration: readTime,
      slug,
      path,
      ga_page,
      source_url: makeSourceUrl({ slug, meta }),
      is_new: index === 0,
      stack: stack ? stack.split(",") : [],
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

  const layout = createLayout({
    lang,
    articles: data,
    articleThumbnails,
  })

  data.forEach(article => {
    createPage({
      path: article.path,
      component: makeComponent(),
      context: {
        article,
        layout,
      },
    })
  })

  return [layout, data]
}

module.exports = {
  ArticlePageCreator,
}
