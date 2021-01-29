const path = require("path")
const authors = require('./src/data/authors.json')

// create pages dynamically
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(`
    {
      allMdx {
        nodes {
          frontmatter {
            date
            authorId
            description
            readTime
            tags
            title
          }
          slug
          body
        }
      }
    }
  `)

  result.data.allMdx.nodes.forEach(node => {
    createPage({
      path: `/articles/${node.slug}`,
      component: path.resolve(
        `src/components/article/Article.tsx`
      ),
      context: {
        article: {
          ...node,
          author: {
            id: node.frontmatter.authorId,
            ...authors[node.frontmatter.authorId]
          }
        }
      }
    })
  })
}
