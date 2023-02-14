const { resolve } = require("path")
const { getCoursesQuery } = require("./src/api/getCoursesQuery")
const authors = require("./src/authors/authors.json")

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    node: {
      fs: "empty",
    },
  })
}

const createArticlePage = async ({ actions, graphql }) => {
  const { createPage } = actions

  const result = await graphql(`
    {
      techAvatars: allFile(
        filter: { relativeDirectory: { regex: "/technologies/" } }
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
      allFile(filter: { name: { ne: "index" } }) {
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
      allMdx(filter: { fileAbsolutePath: { regex: "/index.mdx/" } }) {
        nodes {
          slug
          body
          frontmatter {
            authorId
            cdate
            description
            readTime
            treviewerId
            lreviewerId
            mdate
            tags
            title
            stack
          }
        }
      }
    }
  `)

  const getSlug = relativePath => {
    const parts = relativePath.split("/")
    const filtered = parts.filter((_, i) => i !== 0 && i < parts.length - 1)
    return `${filtered.join("/")}/`
  }

  const thumbnails = result.data.thumbnails.nodes.reduce((acc, node) => {
    return {
      ...acc,
      [getSlug(node.relativePath)]: node.childImageSharp.fluid,
    }
  }, {})

  const techAvatars = result.data.techAvatars.nodes.reduce((acc, node) => {
    return {
      ...acc,
      [node.name]: node.childImageSharp.fluid,
    }
  }, {})

  result.data.allMdx.nodes
    .sort((a, b) => {
      if (a.frontmatter.cdate > b.frontmatter.cdate) {
        return -1
      }

      if (a.frontmatter.cdate === b.frontmatter.cdate) {
        return 0
      }

      return 1
    })
    .forEach((allMdxNode, idx) => {
      const authorImage = result.data.allFile.nodes.find(
        allFileNode => allFileNode.name === allMdxNode.frontmatter.authorId
      )
      const techReviewerImage = result.data.allFile.nodes.find(
        allFileNode => allFileNode.name === allMdxNode.frontmatter.treviewerId
      )
      const lingReviewerImage = result.data.allFile.nodes.find(
        allFileNode => allFileNode.name === allMdxNode.frontmatter.lreviewerId
      )

      createPage({
        path: `/articles/${allMdxNode.slug}`,
        component: resolve(`src/components/article/Article.tsx`),
        context: {
          article: {
            ...allMdxNode,
            thumbnail: thumbnails[allMdxNode.slug],
            stack: allMdxNode.frontmatter.stack.split(",").map(id => ({
              id,
              avatar: techAvatars[id],
            })),
            author: {
              ...authors.find(
                auth => auth.id === allMdxNode.frontmatter.authorId
              ),
              id: allMdxNode.frontmatter.authorId,
              avatar: authorImage.childImageSharp.fluid,
            },
            lingReviewer: {
              ...authors.find(
                auth => auth.id === allMdxNode.frontmatter.lreviewerId
              ),
              id: allMdxNode.frontmatter.lreviewerId,
              avatar: lingReviewerImage.childImageSharp.fluid,
            },
            techReviewer: {
              ...authors.find(
                auth => auth.id === allMdxNode.frontmatter.treviewerId
              ),
              id: allMdxNode.frontmatter.treviewerId,
              avatar: techReviewerImage.childImageSharp.fluid,
            },
            isNew: idx === 0,
          },
        },
      })
    })
}

const createCoursePage = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(`
    {
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
          frontmatter {
            name
            duration
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
  })
}

// create pages dynamically
exports.createPages = async props => {
  await createArticlePage(props)
  await createCoursePage(props)
}
