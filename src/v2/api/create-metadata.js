const meta = require("../core/meta.json")
const layout_en = require("../translation/layout/en.json")
const layout_pl = require("../translation/layout/pl.json")

const createMetadata = (enMeta, plMeta) => {
  const metadata = {
    en: {
      layout: {
        t: layout_en,
        lang: meta.langs.en,
        lang_alternate: meta.langs.pl,
      },
      ...enMeta,
    },
    pl: {
      layout: {
        t: layout_pl,
        lang: meta.langs.pl,
        lang_alternate: meta.langs.en,
      },
      ...plMeta,
    },
  }

  return {
    meta,
    metadata,
  }
}

module.exports = {
  createMetadata,
}
