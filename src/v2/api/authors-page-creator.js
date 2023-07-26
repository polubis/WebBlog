const { createUser } = require("./createUser")
const authors_en = require("../translation/authors/en.json")
const authors_pl = require("../translation/authors/pl.json")

const AuthorsPageCreator = ({ createPage, makeComponent }) => ({
  ga_page,
  path,
}) => async ({ layout, lang, authorsAvatars, authors }) => {
  const translation = {
    en: authors_en,
    pl: authors_pl,
  }

  createPage({
    path,
    component: makeComponent(),
    context: {
      authors: {
        t: translation[lang],
        ga_page,
        url: layout.site_url + path,
        authors: authors
          .map(author => createUser(author.id, authors, authorsAvatars))
          .map(author => ({
            ...author,
            bio: lang === layout.langs.en.key ? author.bio : author.bioPl,
            avatar: author.avatar.medium,
          })),
      },
      layout,
    },
  })
}

module.exports = {
  AuthorsPageCreator,
}
