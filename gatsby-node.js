const { resolve } = require("path")
const { getAllDataQuery } = require("./src/api/getAllDataQuery")
const authors = require("./src/authors/authors.json")
const translationObject = require("./translations.json")
const fetch = require("node-fetch")
const { formatDistanceStrict } = require("date-fns")
const article_en = require("./src/v2/translation/article/en.json")
const layout_en = require("./src/v2/translation/layout/en.json")
const article_pl = require("./src/v2/translation/article/pl.json")
const layout_pl = require("./src/v2/translation/layout/pl.json")
const meta = require("./src/v2/core/meta.json")

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
            seniorityLevel
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
            seniorityLevel
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
          rawBody
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

  const { articles, courses, translatedArticles, site, materials } = data
  const { routes } = site

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

  translatedArticles.forEach(article => {
    createPage({
      path: article.path,
      component: resolve(`src/v2/features/article/ArticlePage.tsx`),
      context: {
        layout: {
          articles: data.articles,
          meta,
          t: layout_pl,
          lang: meta.langs.pl,
        },
        article: {
          article,
          author: article.author.firstName + " " + article.author.lastName,
          dates: {
            updated: `updated: ${formatDistanceStrict(
              new Date(article.modifiedAt),
              new Date()
            )} ago`,
            created: `created: ${formatDistanceStrict(
              new Date(article.createdAt),
              new Date()
            )} ago`,
          },
          t: article_pl,
        },
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
      component: resolve(`src/v2/features/article/ArticlePage.tsx`),
      context: {
        layout: {
          articles: data.articles,
          meta,
          t: layout_en,
          lang: meta.langs.en,
        },
        article: {
          article,
          author: article.author.firstName + " " + article.author.lastName,
          dates: {
            updated: `updated: ${formatDistanceStrict(
              new Date(article.modifiedAt),
              new Date()
            )} ago`,
            created: `created: ${formatDistanceStrict(
              new Date(article.createdAt),
              new Date()
            )} ago`,
          },
          t: article_en,
        },
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
