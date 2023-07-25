const { resolve } = require("path")
const { getAllDataQuery } = require("./src/api/getAllDataQuery")
const authors = require("./src/authors/authors.json")
const translationObject = require("./translations.json")
const fetch = require("node-fetch")
const {
  getPlArticleSlug,
  getEnArticleSlug,
} = require("./src/v2/api/getArticleThumbnail")
const { ArticlePageCreator } = require("./src/v2/api/article-page-creator")

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    node: {
      fs: "empty",
    },
  })
}

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  const result = await graphql(`
    {
      technologiesAvatars: allFile(
        filter: { relativePath: { regex: "/technologies/" } }
      ) {
        nodes {
          name
          relativePath
          childImageSharp {
            fixed(width: 40, height: 40, quality: 1) {
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
      articleThumbnails: allFile(filter: { name: { regex: "/thumbnail/" } }) {
        nodes {
          name
          relativePath
          medium: childImageSharp {
            fixed(width: 60, height: 60, quality: 24) {
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
      materials: allMdx(
        filter: { fileAbsolutePath: { regex: "/material.mdx/" } }
      ) {
        nodes {
          frontmatter {
            cdate
            mdate
            authorId
            description
            stack
            title
          }
          body
          slug
          fileAbsolutePath
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
      site {
        siteMetadata {
          siteUrl
          siteName
          siteDescription
          langs {
            en {
              html
              key
            }
            pl {
              html
              key
            }
          }
          routes {
            articles {
              key
              to
              gaPage
            }
            authors {
              key
              to
              gaPage
            }
            courses {
              key
              to
              gaPage
            }
            snippetCreator {
              key
              to
              gaPage
            }
            creator {
              key
              to
              gaPage
            }
            home {
              key
              to
              gaPage
            }
          }
        }
      }
    }
  `)

  const discordMembersResult = await fetch(
    `https://discord.com/api/v9/invites/PxXQayT3x3?with_counts=true`
  )
  const discordMembersData = await discordMembersResult.json()
  const discordMembers = discordMembersData.approximate_member_count

  const githubContributorsResult = await fetch(
    `https://api.github.com/repos/polubis/WebBlog/contributors`
  )
  const githubContributorsData = await githubContributorsResult.json()
  const githubContributors = githubContributorsData.length

  const data = getAllDataQuery({
    ...result.data,
    authors,
    translationObject,
  })

  const { courses, site, materials } = data
  const { routes } = site

  const authorsAvatars = result.data.authorsAvatars.nodes
  const articleThumbnails = result.data.articleThumbnails.nodes
  const technologiesAvatars = result.data.technologiesAvatars.nodes

  const createEnglishArticlePages = ArticlePageCreator({
    createPage,
  })({
    makeSlug: getEnArticleSlug,
    makeComponent: () => resolve(`src/v2/features/article/ArticlePage.tsx`),
    makePath: ({ slug }) => "/articles/" + slug + "/",
    makeGaPage: ({ slug }) => "articles/" + slug,
    makeSourceUrl: ({ slug, meta }) =>
      meta.article_source_url + "/articles/" + slug,
    makeTranslationPath: ({ slug }) => "/pl/articles/" + slug + "/",
  })

  const enArticles = createEnglishArticlePages({
    articles: result.data.articles.nodes,
    authorsAvatars,
    articleThumbnails,
    technologiesAvatars,
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
      meta.article_source_url + "/articles/" + slug,
    makeTranslationPath: ({ slug }) => "/articles/" + slug + "/",
  })

  const plArticles = createPolishArticlePages({
    articles: result.data.translatedArticles.nodes,
    authorsAvatars,
    articleThumbnails,
    technologiesAvatars,
    authors,
  })

  createPage({
    path: routes.home.to,
    component: resolve(`src/components/home/HomePage.tsx`),
    context: {
      ...data,
      holeImg: result.data.blackHoleImg.nodes[0].childImageSharp.fluid,
      discordMembers,
      githubContributors,
    },
  })

  createPage({
    path: routes.articles.to,
    component: resolve(`src/features/articles/ArticlesPage.tsx`),
    context: {
      ...data,
      bubblesImg: result.data.bubblesImg.nodes[0].childImageSharp.fluid,
    },
  })

  createPage({
    path: routes.authors.to,
    component: resolve(`src/features/authors/AuthorsPage.tsx`),
    context: data,
  })

  createPage({
    path: routes.courses.to,
    component: resolve(`src/features/courses/CoursesPage.tsx`),
    context: data,
  })

  createPage({
    path: routes.creator.to,
    component: resolve(`src/features/blog-creator/BlogCreatorPage.tsx`),
    context: data,
  })

  createPage({
    path: "/snippet-creator/",
    component: resolve(`src/features/snippet-creator/SnippetCreatorPage.tsx`),
    context: data,
  })

  materials.forEach(material => {
    createPage({
      path: material.path,
      component: resolve(`src/features/materials/MaterialPage.tsx`),
      context: {
        ...data,
        material,
      },
    })
  })

  courses.forEach(course => {
    createPage({
      path: course.path,
      component: resolve(`src/features/courses/Course.tsx`),
      context: {
        ...data,
        course,
      },
    })

    course.chapters.forEach(chapter => {
      chapter.lessons.forEach(lesson => {
        createPage({
          path: lesson.path,
          component: resolve(`src/features/lessons/Lesson.tsx`),
          context: {
            ...data,
            lesson,
            chapter,
            course,
          },
        })
      })
    })
  })
}
