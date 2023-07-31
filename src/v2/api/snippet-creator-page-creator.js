const en = require("../translation/snippet-creator/en.json")
const pl = require("../translation/snippet-creator/pl.json")
const { REFACTOR_SAMPLE_EN } = require("./refactor-sample-en")
const { REFACTOR_SAMPLE_PL } = require("./refactor-sample-pl")

const SnippetCreatorPageCreator = ({ createPage, makeComponent }) => ({
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
    pl: [...REFACTOR_SAMPLE_PL],
    en: [...REFACTOR_SAMPLE_EN],
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
  SnippetCreatorPageCreator,
}
