const path = require("path")

// create pages dynamically
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(`
    {
      allMdx {
        nodes {
          frontmatter {
            date
            author
            authorRole
            description
            readTime
            tags
            thumbnail
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
        `src/components/article-layout/ArticleLayout.tsx`
      ),
      context: {
        ...node
      }
    })
  })
}
