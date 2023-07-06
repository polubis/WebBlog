import {
  Avatar,
  Article,
  Author,
  Course,
  SiteMetadata,
  TranslatedArticle,
  Material,
  TranslationObject,
} from "../models"
import { TimelineData } from "../components/timeline"

interface AllDataResponse {
  articles: Article[]
  authors: Author[]
  materials: Material[]
  courses: Course[]
  totalLessons: number
  totalChapters: number
  totalStack: number
  timeline: TimelineData
  site: SiteMetadata
  translatedArticles: TranslatedArticle[]
  animalsAvatars: Avatar[]
  translationObject: TranslationObject
  footerArticles: Article[]
}

export type { AllDataResponse }
