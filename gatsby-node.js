const path = require("path")
const authors = require("./src/authors/authors.json")

// create pages dynamically
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(`
    {
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
