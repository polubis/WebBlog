const { resolve } = require("path")
const { getArticlesQuery } = require("./src/api/getArticlesQuery")
const { getCoursesQuery } = require("./src/api/getCoursesQuery")
const authors = require("./src/authors/authors.json")

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    node: {
      fs: "empty",
    },
  })
}

const createArticlePages = async ({ actions, graphql }) => {
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
      thumbnails: allFile(filter: { name: { regex: "/thumbnail/" } }) {
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
      articles: allMdx(filter: { fileAbsolutePath: { regex: "/index.mdx/" } }) {
        nodes {
          frontmatter {
            cdate
            mdate
            graphicauthor
            tbcdate
            authorId
            treviewerId
            lreviewerId
            tags
            description
            readTime
            stack
            title
          }
          body
          slug
        }
      }
    }
  `)

  const articles = getArticlesQuery({
    ...result.data,
    authors,
  })

  articles.forEach(article => {
    createPage({
      path: article.path,
      component: resolve(`src/components/article/Article.tsx`),
      context: {
        article,
      },
    })
  })
}

const createCoursePages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(`
    {
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
      chapters: allMdx(filter: { slug: { regex: "/chapter/" } }) {
        nodes {
          slug
          frontmatter {
            name
          }
        }
      }
      techAvatars: allFile(
        filter: { relativeDirectory: { regex: "/technologies/" } }
      ) {
        nodes {
          name
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
      avatars: allFile(filter: { absolutePath: { regex: "/avatars/" } }) {
        nodes {
          name
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

  const courses = getCoursesQuery({
    ...result.data,
    authors,
  })

  courses.forEach(course => {
    createPage({
      path: course.path,
      component: resolve(`src/features/courses/Course.tsx`),
      context: {
        course,
      },
    })

    course.chapters.forEach(chapter => {
      chapter.lessons.forEach(lesson => {
        createPage({
          path: lesson.path,
          component: resolve(`src/features/lessons/Lesson.tsx`),
          context: {
            lesson,
            chapter,
            course,
          },
        })
      })
    })
  })
}

// create pages dynamically
exports.createPages = async props => {
  await createArticlePages(props)
  await createCoursePages(props)
}
