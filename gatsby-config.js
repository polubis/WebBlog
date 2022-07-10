const siteUrl = process.env.URL || `https://www.greenonsoftware.com`

module.exports = {
  siteMetadata: {
    siteUrl,
  },
  plugins: [
    "gatsby-plugin-styled-components",
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `GreenOn Software`,
        short_name: `GreenOn Software`,
        description: `We do everything to provide programming knowledge in a short, user-friendly form. It allows you to walk away from your computer faster and reduce your carbon footprint.`,
        start_url: `/`,
        background_color: `#0A0A0A`,
        lang: "en-US",
        theme_color: `#fff`,
        display: `standalone`,
        icons: [
          {
            src: "/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icon-256x256.png",
            sizes: "256x256",
            type: "image/png",
          },
          {
            src: "/icon-384x384.png",
            sizes: "384x384",
            type: "image/png",
          },
          {
            src: "/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    },
    `gatsby-plugin-offline`,
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
        usePreconnect: true,
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
