const { relative } = require("path")
const path = require("path")
const authors = require("./src/authors/authors.json")

// create pages dynamically
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(`
    {
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
            date
            description
            readTime
            tags
            title
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

  result.data.allMdx.nodes.forEach(allMdxNode => {
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
          author: {
            ...authors[allMdxNode.frontmatter.authorId],
            id: allMdxNode.frontmatter.authorId,
            avatar: childImageSharp.childImageSharp.fluid,
          },
        },
      },
    })
  })
}
