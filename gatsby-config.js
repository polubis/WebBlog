const siteUrl = process.env.URL || `https://www.greenonsoftware.com`

module.exports = {
  siteMetadata: {
    siteUrl,
  },
  plugins: [
    "gatsby-plugin-styled-components",
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [".mdx", ".md"],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-highlight-code`,
            options: {
              terminal: "carbon",
              theme: "dracula",
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-webfonts`,
      options: {
        fonts: {
          google: [
            {
              family: "Lexend",
              variants: ["400", "500", "700"],
            },
            { family: "Open Sans" },
          ],
        },
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `assets`,
        path: `${__dirname}/src/assets`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `articles`,
        path: `${__dirname}/src/articles`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `authors`,
        path: `${__dirname}/src/authors`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: "gatsby-plugin-sitemap",
      options: {
        query: `
          {
            allSitePage {
              nodes {
                path
                context {
                  article {
                    frontmatter {
                      cdate
                      mdate
                    }
                  }
                }
              }
            }
          }
        `,
        resolveSiteUrl: () => siteUrl,
        resolvePages: ({ allSitePage: { nodes } }) => {
          return nodes.map(page => {
            const isArticleGeneratedPage =
              !!page.context && !!page.context.article
            let mdate = null

            if (!!page.context && !!page.context.article) {
              mdate = page.context.article.frontmatter.mdate
            }

            return {
              path: page.path,
              mdate,
              isArticleGeneratedPage,
            }
          })
        },
        serialize: ({ path, isArticleGeneratedPage, mdate }) => {
          return {
            url: path,
            lastmod: mdate ? mdate : new Date().toISOString(),
            priority: isArticleGeneratedPage ? 1 : 0.7,
            changefreq: isArticleGeneratedPage ? "daily" : "weekly",
          }
        },
      },
    },
  ],
}
