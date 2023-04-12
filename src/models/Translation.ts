import translation from "../../translations.json"

interface Translation {
  lang: string
  path: string
}

type TranslationObject = typeof translation
type Translated = TranslationObject["en"] | TranslationObject["pl"]

export type { Translation, TranslationObject, Translated }
