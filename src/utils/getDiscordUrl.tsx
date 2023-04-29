import { graphql, useStaticQuery } from "gatsby"

export const getDiscordUrl = (): string => {
  const data = useStaticQuery(graphql`
    query getDiscordLink {
      site {
        siteMetadata {
          discordUrl
        }
      }
    }
  `)
  
  return data.site.siteMetadata.discordUrl
}
