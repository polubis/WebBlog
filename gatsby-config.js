const siteUrl = `https://greenonsoftware.com`
const siteName = "GreenOn Software"

module.exports = {
  plugins: [
    "gatsby-plugin-styled-components",
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: siteName,
        short_name: siteName,
        description: `A place for people who love programming and personal development.`,
        start_url: '/',
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
    {
      resolve: "gatsby-plugin-remove-serviceworker",
    },
    // {
    //   resolve: "gatsby-plugin-offline",
    //   options: {
    //     workboxConfig: {
    //       runtimeCaching: [
    //         {
    //           urlPattern: /(\.js$|\.css$|static\/)/,
    //           handler: `CacheFirst`,
    //           options: {
    //             cacheName: "app-assets",
    //             expiration: {
    //               maxAgeSeconds: 3 * 24 * 60 * 60,
    //             },
    //           },
    //         },
    //         {
    //           urlPattern: /^https?:.*\/page-data\/.*\.json/,
    //           handler: `StaleWhileRevalidate`,
    //         },
    //         {
    //           urlPattern: /^https?:.*\.(png|jpg|jpeg|webp|svg|gif|tiff|js|woff|woff2|json|css)$/,
    //           handler: `StaleWhileRevalidate`,
    //         },
    //         {
    //           urlPattern: /^https?:\/\/fonts\.googleapis\.com\/css/,
    //           handler: `StaleWhileRevalidate`,
    //         },
    //       ],
    //     },
    //   },
    // },
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        host: siteUrl,
        sitemap: `${siteUrl}/sitemap/sitemap-index.xml`,
        policy: [{ userAgent: "*", allow: ["/"] }],
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [".mdx", ".md"],
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
        name: `courses`,
        path: `${__dirname}/src/courses`,
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
              }
            }
          }
        `,
        resolveSiteUrl: () => siteUrl,
        resolvePages: ({ allSitePage: { nodes } }) => {
          return nodes.map(page => {
            return {
              path: page.path,
            }
          })
        },
        serialize: ({ path }) => {
          return {
            url: path,
            lastmod: new Date().toISOString(),
          }
        },
      },
    },
  ],
}
