const path = require("path")
const authors = require("./src/authors/authors.json")

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    node: {
      fs: "empty",
    },
  })
}

// create pages dynamically
exports.createPages = async ({ graphql, actions }) => {
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
      allMdx {
        nodes {
          body
          slug
          frontmatter {
            authorId
            cdate
            description
            readTime
            mdate
            tags
            substantive
            linguistic
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
      const childImageSharp = result.data.allFile.nodes.find(
        allFileNode => allFileNode.name === allMdxNode.frontmatter.authorId
      )

      createPage({
        path: `/articles/${allMdxNode.slug}`,
        component: path.resolve(`src/components/article/Article.tsx`),
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
              avatar: childImageSharp.childImageSharp.fluid,
            },
            isNew: idx === 0,
          },
        },
      })
    })
}
