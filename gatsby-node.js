const { resolve } = require("path")
const { getAllDataQuery } = require("./src/api/getAllDataQuery")
const authors = require("./src/authors/authors.json")
const translationObject = require("./translations.json")

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
      articleThumbnails: allFile(filter: { name: { regex: "/thumbnail/" } }) {
        nodes {
          name
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
      authorsAvatars: allFile(
        filter: { relativePath: { regex: "/avatars/" } }
      ) {
        nodes {
          name
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
      translatedArticles: allMdx(
        filter: { fileAbsolutePath: { regex: "/article-[a-z][a-z].mdx/" } }
      ) {
        nodes {
          frontmatter {
            cdate
            mdate
            tbcdate
            authorId
            treviewerId
            lreviewerId
            tags
            description
            readTime
            graphicauthor
            stack
            title
          }
          rawBody
          slug
          body
        }
      }
      articles: allMdx(filter: { fileAbsolutePath: { regex: "/index.mdx/" } }) {
        nodes {
          frontmatter {
            cdate
            mdate
            tbcdate
            authorId
            treviewerId
            lreviewerId
            tags
            langs
            description
            readTime
            graphicauthor
            stack
            title
          }
          rawBody
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
      animalsAvatars: allFile(
        filter: { relativePath: { regex: "/animals/" } }
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

  const data = getAllDataQuery({
    ...result.data,
    authors,
    translationObject,
  })

  const { articles, courses, translatedArticles, site, materials } = data
  const { routes } = site

  createPage({
    path: routes.home.to,
    component: resolve(`src/components/home/HomePage.tsx`),
    context: {
      ...data,
      holeImg: result.data.blackHoleImg.nodes[0].childImageSharp.fluid,
    },
  })

  createPage({
    path: routes.articles.to,
    component: resolve(`src/features/articles/ArticlesPage.tsx`),
    context: data,
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

  translatedArticles.forEach(translatedArticle => {
    createPage({
      path: translatedArticle.path,
      component: resolve(`src/components/article/TranslatedArticlePage.tsx`),
      context: {
        ...data,
        translatedArticle,
      },
    })
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

  articles.forEach(article => {
    createPage({
      path: article.path,
      component: resolve(`src/components/article/Article.tsx`),
      context: {
        ...data,
        article,
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
