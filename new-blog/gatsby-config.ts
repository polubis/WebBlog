import type { GatsbyConfig, PluginRef } from "gatsby"
import "dotenv/config"

const config: GatsbyConfig = {
  siteMetadata: {
    siteTitle: `Cara`,
    siteTitleAlt: `Cara - Gatsby Starter Portfolio`,
    siteHeadline: `Cara - Gatsby Theme from @lekoarts`,
    siteUrl: `https://cara.lekoarts.de`,
    siteDescription: `Playful and Colorful One-Page portfolio featuring Parallax effects and animations`,
    siteImage: `/banner.jpg`,
    siteLanguage: `en`,
    author: `@lekoarts_de`,
  },
  trailingSlash: `never`,
  plugins: [
  ].filter(Boolean) as Array<PluginRef>,
}

export default config