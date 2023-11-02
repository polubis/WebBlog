import type {
  FixedObject as GatsbyFixedObject,
  FluidObject,
} from "gatsby-image"
import type article_en from "../translation/article/en.json"
import type article_pl from "../translation/article/pl.json"
import type meta from "../core/meta.json"
import type layout_en from "../translation/layout/en.json"
import type layout_pl from "../translation/layout/pl.json"
import type authors_en from "../translation/authors/en.json"
import type authors_pl from "../translation/authors/pl.json"
import type articles_en from "../translation/articles/en.json"
import type articles_pl from "../translation/articles/pl.json"
import type courses_en from "../translation/courses/en.json"
import type courses_pl from "../translation/courses/pl.json"
import type course_en from "../translation/course/en.json"
import type course_pl from "../translation/course/pl.json"
import type lesson_pl from "../translation/course/pl.json"
import type lesson_en from "../translation/course/en.json"
import type home_pl from "../translation/home/pl.json"
import type home_en from "../translation/home/en.json"
import type { TimelineData } from "../../components/timeline/models/data"
import type blog_creator_en from "../translation/blog-creator/en.json"
import type blog_creator_pl from "../translation/blog-creator/pl.json"

export type Id = string
export type Title = string
export type Name = string
export type Path = string
export type CDate = string
export type Mdate = string
export type Url = string
export type Slug = string
export type GaPage = string

export type FixedObject = GatsbyFixedObject & { originalName: string }

export interface MinimumArticle {
  title: Title
  path: Path
  thumbnail: FixedObject
}

export interface UserAvatar {
  tiny: FixedObject
  small: FixedObject
  medium: FixedObject
  big: FixedObject
}

export interface User {
  id: Id
  name: Name
  full_name: Name
  first_name: Name
  platform_roles: string[]
  role: string
  bio: string
  avatar: UserAvatar
  last_name: Name
  github_url?: Url
  linkedin_url?: Url
}

export type Meta = typeof meta
export type Lang = typeof meta["langs"]["en"] | typeof meta["langs"]["pl"]
export type LangKey = Lang["key"]
export type LayoutT = typeof layout_en | typeof layout_pl
export type ArticleT = typeof article_en | typeof article_pl
export type ArticlesT = typeof articles_en | typeof articles_pl
export type AuthorsT = typeof authors_en | typeof authors_pl
export type CoursesT = typeof courses_en | typeof courses_pl
export type CourseT = typeof course_en | typeof course_pl
export type LessonT = typeof lesson_en | typeof lesson_pl
export type HomeT = typeof home_en | typeof home_pl
export type BlogCreatorT = typeof blog_creator_en | typeof blog_creator_pl

export interface ArticleThumbnail {
  full: FluidObject
  medium: FixedObject
}

export interface Layout extends Meta {
  lang: Lang
  lang_alternate: Lang
  t: LayoutT
  articles: MinimumArticle[]
}

export type Rate = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10

export interface Technology {
  id: Id
  avatar: FixedObject
}

export enum Seniority {
  beginner = "🔰",
  intermediate = "⭐",
  advanced = "🌟",
  expert = "🥇",
}

export interface ArticlePageModel {
  title: Title
  description: string
  mdate: Mdate
  body: string
  ga_page: string
  path: string
  is_new: boolean
  rate?: Rate
  vote?: Vote
  resourcePath: Path
  read_time: number
  cdate: CDate
  source_url: Url
  url: Url
  slug: Slug
  translation_path?: string
  seniority: Seniority
  thumbnail: ArticleThumbnail
  lang: LangKey
  t: ArticleT
  author: Omit<User, "avatar"> & {
    avatar: Pick<User["avatar"], "small" | "medium">
  }
  tech_reviewer: Omit<User, "avatar"> & {
    avatar: Pick<User["avatar"], "small">
  }
  ling_reviewer: Omit<User, "avatar"> & {
    avatar: Pick<User["avatar"], "small">
  }
  tags: string[]
  technologies: Technology[]
  next?: MinimumArticle
  prev?: MinimumArticle
}

export interface AuthorsPageModel {
  t: AuthorsT
  ga_page: GaPage
  url: Url
  authors: (Omit<User, "avatar"> & { avatar: FixedObject })[]
}

export interface ArticlesPageModelArticleAuthor {
  id: User["id"]
  full_name: User["full_name"]
  avatar: {
    tiny: FixedObject
    small: FixedObject
  }
}

export type ArticlesPageModelArticle = Pick<
  ArticlePageModel,
  | "path"
  | "description"
  | "title"
  | "is_new"
  | "read_time"
  | "tags"
  | "seniority"
> & {
  author: ArticlesPageModelArticleAuthor
}

export interface ArticlesPageModel {
  t: ArticlesT
  ga_page: GaPage
  url: Url
  thumbnail: FluidObject
  authors: ArticlesPageModelArticleAuthor[]
  articles: ArticlesPageModelArticle[]
}

export type CourseStatus = "SHEDULED" | "PENDING" | "FINISHED"

export interface CoursesPageModelCourse {
  tags: string[]
  title: Title
  description: string
  path: Path
  status: CourseStatus
  duration: number
}

export interface CoursesPageModel {
  t: CoursesT
  ga_page: string
  url: Url
  courses: CoursesPageModelCourse[]
}

export interface CoursePageModel {
  t: CourseT
  ga_page: GaPage
  url: Url
  mdate: Mdate
  cdate: CDate
  status: CourseStatus
  title: Title
  tags: string[]
  technologies: Technology[]
  description: string
  thumbnail: FluidObject
  duration: number
  lessons_count: number
  author: Omit<User, "avatar"> & {
    avatar: Pick<User["avatar"], "small" | "medium">
  }
  tech_reviewer: Omit<User, "avatar"> & {
    avatar: Pick<User["avatar"], "small">
  }
  ling_reviewer: Omit<User, "avatar"> & {
    avatar: Pick<User["avatar"], "small">
  }
  chapters: {
    duration: number
    title: Title
    lessons: {
      title: Title
      duration: number
      path: Path
    }[]
  }[]
}

export interface LessonPageModel {
  t: LessonT
  ga_page: GaPage
  url: Url
  duration: number
  body: string
  thumbnail: FluidObject
  description: string
  title: Title
  course: {
    title: Title
    path: Path
    seniority: Seniority
    tags: string[]
    technologies: Technology[]
  }
  chapter: {
    title: Title
  }
  chapters: {
    duration: number
    title: Title
    lessons: {
      title: Title
      duration: number
      path: Path
    }[]
  }[]
  source_url: Url
  next?: {
    path: Path
  }
  prev?: {
    path: Path
  }
}

export interface HomePageModel {
  t: HomeT
  ga_page: GaPage
  url: Url
  articles_count: number
  authors_count: number
  courses_count: number
  students_count: number
  devs_count: number
  lessons_count: number
  technologies_count: number
  showcase_frames: string[]
  topics_count: number
  random_user_avatar: FixedObject
  thumbnail: FluidObject
  timeline: TimelineData
}

export interface BlogCreatorPageModel {
  t: BlogCreatorT
  ga_page: GaPage
  url: Url
  samples: Record<keyof BlogCreatorT["samples"], string>
}

export interface Response<T> {
  data: T
  errors: string[]
  hasErrors: boolean
  success: boolean
}

export interface Comment {
  id: Id
  path: Path
  content: string
  rate?: Rate
  date: CDate
  author: {
    id: Id
    avatar: string | null
    nickname: string | null
  }
}

export interface Vote {
  positive: number
  negative: number
}

export type TMap<T> = Record<LangKey, T>

export type State<I extends string, T = undefined> = T extends undefined
  ? { is: I }
  : { is: I } & T
