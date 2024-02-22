const en = require("../translation/mentoring/en.json")
const pl = require("../translation/mentoring/pl.json")

const MentoringPageCreator = ({ createPage, makeComponent }) => ({
  layout,
  lang,
  ga_page,
  path,
  thumbnail,
}) => {
  const translation = {
    en,
    pl,
  }

  createPage({
    path,
    component: makeComponent(),
    context: {
      mentoring: {
        t: translation[lang],
        ga_page,
        url: layout.site_url + path,
        thumbnail,
      },
      layout,
    },
  })
}

module.exports = {
  MentoringPageCreator,
}
