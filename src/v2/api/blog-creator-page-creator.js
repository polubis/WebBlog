const en = require("../translation/blog-creator/en.json")
const pl = require("../translation/blog-creator/pl.json")
const samples_en = require("./mdx-samples-en")
const samples_pl = require("./mdx-samples-pl")

const BlogCreatorPageCreator = ({ createPage, makeComponent }) => ({
  layout,
  lang,
  ga_page,
  path,
}) => {
  const translation = {
    en,
    pl,
  }
  const samples = {
    pl: samples_pl,
    en: samples_en,
  }

  createPage({
    path,
    component: makeComponent(),
    context: {
      creator: {
        t: translation[lang],
        ga_page,
        url: layout.site_url + path,
        samples: samples[lang],
      },
      layout,
    },
  })
}

module.exports = {
  BlogCreatorPageCreator,
}
