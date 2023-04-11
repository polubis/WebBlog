import {
  Avatar,
  Article,
  Author,
  Course,
  SiteMetadata,
  TranslatedArticle,
  TranslationObject,
} from "../models"
import { TimelineData } from "../components/timeline"

interface AllDataResponse {
  articles: Article[]
  authors: Author[]
  courses: Course[]
  totalLessons: number
  timeline: TimelineData
  site: SiteMetadata
  translatedArticles: TranslatedArticle[]
  animalsAvatars: Avatar[]
  translationObject: TranslationObject
}

export type { AllDataResponse }
