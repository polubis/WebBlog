const en = require("../translation/mentorship/en.json")
const pl = require("../translation/mentorship/pl.json")

const MentorshipPageCreator = ({ createPage, makeComponent }) => ({
  ga_page,
  path,
  layout,
  lang,
}) => {
  const translation = {
    en,
    pl,
  }

  createPage({
    path,
    component: makeComponent(),
    context: {
      mentorship: {
        t: translation[lang],
        ga_page,
        url: layout.site_url + path,
      },
      layout,
    },
  })
}

module.exports = {
  MentorshipPageCreator,
}
