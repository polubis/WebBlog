const siteUrl = process.env.URL || `https://www.greenonsoftware.com`

module.exports = {
  siteMetadata: {
    siteUrl,
  },
  plugins: [
    "gatsby-plugin-scss-typescript",
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
                      date
                      modificationDate
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
            return {
              path: page.path,
              modificationDate: page.context?.article
                ? page.context?.article.frontmatter.modificationDate
                : null,
              isArticleGeneratedPage: page.context?.article !== null,
            }
          })
        },
        serialize: ({ path, isArticleGeneratedPage, modificationDate }) => {
          return {
            url: path,
            lastmod:
              modificationDate ??
              new Date()
                .toLocaleDateString()
                .replace(/\//g, "-")
                .split("-")
                .reverse()
                .join("-"),
            priority: isArticleGeneratedPage ? 1 : 0.7,
            changefreq: isArticleGeneratedPage ? "daily" : "weekly",
          }
        },
      },
    },
  ],
}
