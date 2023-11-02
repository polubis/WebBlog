const en = require("../translation/articles/en.json")
const pl = require("../translation/articles/pl.json")
const { createUser } = require("./createUser")

const ArticlesPageCreator = ({ createPage, makeComponent }) => ({
  ga_page,
  path,
}) => async ({
  layout,
  lang,
  articles,
  thumbnail,
  authors,
  authorsAvatars,
}) => {
  const translation = {
    en,
    pl,
  }

  createPage({
    path,
    component: makeComponent(),
    context: {
      articles: {
        t: translation[lang],
        ga_page,
        thumbnail,
        url: layout.site_url + path,
        authors: authors
          .map(author => createUser(author.id, authors, authorsAvatars))
          .map(author => ({
            id: author.id,
            full_name: author.full_name,
            avatar: {
              small: author.avatar.small,
              tiny: author.avatar.tiny,
            },
          })),
        articles: articles.map(
          ({
            path,
            description,
            title,
            is_new,
            duration,
            tags,
            author,
            seniority,
          }) => ({
            path,
            description,
            title,
            is_new,
            duration,
            tags: tags.split(","),
            seniority,
            author: {
              id: author.id,
              full_name: author.full_name,
              avatar: {
                small: author.avatar.small,
                tiny: author.avatar.tiny,
              },
            },
          })
        ),
      },
      layout,
    },
  })
}

module.exports = {
  ArticlesPageCreator,
}
