const { resolve } = require("path")
const authors = require("./src/authors/authors.json")
const {
  getPlArticleSlug,
  getEnArticleSlug,
} = require("./src/v2/api/getArticleThumbnail")
const { ArticlePageCreator } = require("./src/v2/api/article-page-creator")
const { AuthorsPageCreator } = require("./src/v2/api/authors-page-creator")
const { ArticlesPageCreator } = require("./src/v2/api/articles-page-creator")
const { CoursesPageCreator } = require("./src/v2/api/courses-page-creator")
const { CoursePageCreator } = require("./src/v2/api/course-page-creator")
const { CoursesCollection } = require("./src/v2/api/courses-collection")
const { DataRepository } = require("./src/v2/api/data-repository")
const { LessonPageCreator } = require("./src/v2/api/lesson-page-creator")
const { HomePageCreator } = require("./src/v2/api/home-page-creator")
const {
  BlogCreatorPageCreator,
} = require("./src/v2/api/blog-creator-page-creator")
const { getArticleRates, getAllVotes } = require("./src/v2/api/setup-firebase")

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    node: {
      fs: "empty",
    },
  })
}

const createCoursesPage = ({ courses, createPage, enLayout }) => {
  const create = CoursesPageCreator({
    createPage,
    makeComponent: () => resolve("src/v2/features/courses/CoursesPage.tsx"),
    ga_page: "courses",
    path: "/courses/",
  })

  create({ layout: enLayout, lang: "en", courses })
}

const createManyCoursesPages = ({ courses, createPage, enLayout }) => {
  const create = CoursePageCreator({
    createPage,
    makeComponent: () => resolve("src/v2/features/course/CoursePage.tsx"),
  })

  courses.forEach(course => {
    create({ layout: enLayout, lang: "en", course })
  })
}

const createManyLessonsPages = ({
  courses,
  createPage,
  enLayout,
  votes,
  rates,
}) => {
  const create = LessonPageCreator({
    createPage,
    makeComponent: () => resolve("src/v2/features/lesson/LessonPage.tsx"),
  })

  courses.forEach(course => {
    course.chapters.forEach((chapter, chapterIndex) => {
      chapter.lessons.forEach(lesson => {
        create({
          layout: enLayout,
          lang: "en",
          lesson,
          course,
          chapter,
          prevChapter: course.chapters[chapterIndex - 1],
          nextChapter: course.chapters[chapterIndex + 1],
          votes,
          rates,
        })
      })
    })
  })
}

const createBlogCreatorPage = ({ createPage, enLayout, plLayout }) => {
  const create = BlogCreatorPageCreator({
    createPage,
    makeComponent: () =>
      resolve("src/v2/features/blog-creator/BlogCreatorPage.tsx"),
  })

  create({
    lang: "en",
    layout: enLayout,
    ga_page: "blog-creator",
    path: "/blog-creator/",
  })
  create({
    lang: "pl",
    layout: plLayout,
    ga_page: "pl/blog-creator",
    path: "/pl/blog-creator/",
  })
}

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  const result = await graphql(`
    {
      articleThumbnails: allFile(filter: { name: { regex: "/thumbnail/" } }) {
        nodes {
          name
          relativePath
          medium: childImageSharp {
            fixed(width: 50, height: 50, quality: 24) {
              base64
              width
              height
              src
              srcSet
              originalName
            }
          }
          full: childImageSharp {
            fluid {
              base64
              aspectRatio
              src
              srcSet
              sizes
            }
          }
        }
      }
      authorsAvatars: allFile(
        filter: { relativePath: { regex: "/avatars/" } }
      ) {
        nodes {
          name
          relativePath
          tiny: childImageSharp {
            fixed(width: 24, height: 24, quality: 44) {
              base64
              width
              height
              src
              srcSet
              originalName
            }
          }
          small: childImageSharp {
            fixed(width: 50, height: 50, quality: 44) {
              base64
              width
              height
              src
              srcSet
              originalName
            }
          }
          medium: childImageSharp {
            fixed(width: 92, height: 92, quality: 36) {
              base64
              width
              height
              src
              srcSet
              originalName
            }
          }
          big: childImageSharp {
            fixed(width: 200, height: 200, quality: 42) {
              base64
              width
              height
              src
              srcSet
              originalName
            }
          }
        }
      }
      translatedArticles: allMdx(
        filter: { fileAbsolutePath: { regex: "/article-[a-z][a-z].mdx/" } }
      ) {
        nodes {
          frontmatter {
            cdate
            mdate
            authorId
            lang
            treviewerId
            lreviewerId
            tags
            description
            readTime
            stack
            seniorityLevel
            langs
            title
          }
          slug
          body
        }
      }
      articles: allMdx(filter: { fileAbsolutePath: { regex: "/index.mdx/" } }) {
        nodes {
          frontmatter {
            cdate
            mdate
            authorId
            lang
            treviewerId
            lreviewerId
            tags
            langs
            description
            readTime
            stack
            title
            seniorityLevel
          }
          body
          slug
        }
      }
      courses: allMdx(filter: { fileAbsolutePath: { regex: "/course.mdx/" } }) {
        nodes {
          slug
          fileAbsolutePath
          frontmatter {
            authorId
            treviewerId
            lreviewerId
            seniorityLevel
            stack
            tags
            description
            name
            status
            cdate
            mdate
          }
        }
      }
      lessons: allMdx(filter: { slug: { regex: "/lessons/" } }) {
        nodes {
          slug
          body
          frontmatter {
            name
            duration
            description
          }
        }
      }
      chapters: allMdx(filter: { slug: { regex: "/chapter/" } }) {
        nodes {
          slug
          frontmatter {
            name
          }
        }
      }
      coursesThumbnails: allFile(
        filter: { relativePath: { regex: "/course.jpg/" } }
      ) {
        nodes {
          name
          relativePath
          medium: childImageSharp {
            fixed(width: 50, height: 50, quality: 24) {
              base64
              width
              height
              src
              srcSet
              originalName
            }
          }
          full: childImageSharp {
            fluid {
              base64
              aspectRatio
              src
              srcSet
              sizes
            }
          }
        }
      }
      blackHoleImg: allFile(filter: { relativePath: { regex: "/hole.png/" } }) {
        nodes {
          relativePath
          childImageSharp {
            fluid {
              base64
              aspectRatio
              src
              srcSet
              sizes
            }
          }
        }
      }
      lessonsThumbnails: allFile(
        filter: { relativePath: { regex: "/lessons/[0-999]{1,2}.jpg/" } }
      ) {
        nodes {
          name
          relativePath
          medium: childImageSharp {
            fixed(width: 50, height: 50, quality: 24) {
              base64
              width
              height
              src
              srcSet
              originalName
            }
          }
          full: childImageSharp {
            fluid {
              base64
              aspectRatio
              src
              srcSet
              sizes
            }
          }
        }
      }
      bubblesImg: allFile(
        filter: { relativePath: { regex: "/bubbles.png/" } }
      ) {
        nodes {
          relativePath
          childImageSharp {
            fluid {
              base64
              aspectRatio
              src
              srcSet
              sizes
            }
          }
        }
      }
    }
  `)

  const dataRepository = await DataRepository(result)

  const {
    authorsAvatars,
    articleThumbnails,
  } = dataRepository

  const rates = await getArticleRates()
  const votes = await getAllVotes()

  const createEnglishArticlePages = ArticlePageCreator({
    createPage,
  })({
    makeSlug: getEnArticleSlug,
    makeComponent: () => resolve(`src/v2/features/article/ArticlePage.tsx`),
    makePath: ({ slug }) => "/articles/" + slug + "/",
    makeGaPage: ({ slug }) => "articles/" + slug,
    makeSourceUrl: ({ slug, meta }) =>
      meta.article_source_url + "/articles/" + slug + "/index.mdx",
    makeTranslationPath: ({ slug }) => "/pl/articles/" + slug + "/",
    rates,
    votes,
  })

  const [enLayout, enArticles] = await createEnglishArticlePages({
    articles: result.data.articles.nodes,
    authorsAvatars,
    articleThumbnails,
    authors,
  })

  const createPolishArticlePages = ArticlePageCreator({
    createPage,
  })({
    makeSlug: getPlArticleSlug,
    makeComponent: () => resolve(`src/v2/features/article/ArticlePage.tsx`),
    makePath: ({ slug }) => "/pl/articles/" + slug + "/",
    makeGaPage: ({ slug }) => "pl/articles/" + slug,
    makeSourceUrl: ({ slug, meta }) =>
      meta.article_source_url + "/articles/" + slug + "/article-pl.mdx",
    makeTranslationPath: ({ slug }) => "/articles/" + slug + "/",
    rates,
    votes,
  })

  const [plLayout, plArticles] = await createPolishArticlePages({
    articles: result.data.translatedArticles.nodes,
    authorsAvatars,
    articleThumbnails,
    authors,
  })

  const createAuthorsPage = AuthorsPageCreator({
    createPage,
    makeComponent: () => resolve(`src/v2/features/authors/AuthorsPage.tsx`),
  })

  const createEnAuthorsPage = createAuthorsPage({
    ga_page: "authors",
    path: "/authors/",
  })
  createEnAuthorsPage({ layout: enLayout, lang: "en", authorsAvatars, authors })

  const createPlAuthorsPage = createAuthorsPage({
    ga_page: "pl/authors",
    path: "/pl/authors/",
  })
  createPlAuthorsPage({ layout: plLayout, lang: "pl", authorsAvatars, authors })

  const enCourses = CoursesCollection(
    dataRepository,
    enLayout,
    "/courses/",
    "courses"
  )

  const createHomePage = HomePageCreator({
    createPage,
    makeComponent: () => resolve(`src/v2/features/home/HomePage.tsx`),
  })

  createHomePage({
    ...dataRepository,
    courses: enCourses,
    layout: enLayout,
    articles: enArticles,
    path: "/",
    ga_page: "",
    lang: "en",
  })

  createHomePage({
    ...dataRepository,
    courses: [],
    layout: plLayout,
    articles: plArticles,
    path: "/pl/",
    ga_page: "pl",
    lang: "pl",
  })

  const createArticlesPage = ArticlesPageCreator({
    createPage,
    makeComponent: () => resolve(`src/v2/features/articles/ArticlesPage.tsx`),
  })
  const createEnArticlesPage = createArticlesPage({
    ga_page: "articles",
    path: "/articles/",
  })
  const createPlArticlesPage = createArticlesPage({
    ga_page: "pl/articles",
    path: "/pl/articles/",
  })
  const articlesThumbnail =
    result.data.bubblesImg.nodes[0].childImageSharp.fluid
  createPlArticlesPage({
    layout: plLayout,
    lang: "pl",
    authors,
    articles: plArticles,
    thumbnail: articlesThumbnail,
    authorsAvatars,
  })
  createEnArticlesPage({
    layout: enLayout,
    lang: "en",
    articles: enArticles,
    authors,
    thumbnail: articlesThumbnail,
    authorsAvatars,
  })

  createCoursesPage({ courses: enCourses, createPage, enLayout })
  createManyCoursesPages({ courses: enCourses, createPage, enLayout })
  createManyLessonsPages({
    courses: enCourses,
    createPage,
    enLayout,
    votes,
    rates,
  })
  createBlogCreatorPage({ createPage, enLayout, plLayout })
}
