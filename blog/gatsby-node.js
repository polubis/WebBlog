const path = require("path")

// create pages dynamically
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(`
    {
      allMdx {
        nodes {
          slug
        }
      }
    }
  `)

  result.data.allMdx.nodes.forEach(({ slug }) => {
    createPage({
      path: `/articles/${slug}`,
      component: path.resolve(
        `src/components/article-layout/ArticleLayout.tsx`
      ),
    })
  })
}
