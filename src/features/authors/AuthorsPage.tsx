import React from "react"
import Layout from "../../components/layout/Layout"
import { Content, GithubIcon, LinkedinIcon, M, X, XL } from "../../ui"
import { SiteMeta } from "../../utils/SiteMeta"
import AuthorAvatar from "../../components/article/AuthorAvatar"
import styled from "styled-components"
import theme from "../../utils/theme"
import { EmptyAuthorTile } from "../../components/empty-author-tile/EmptyAuthorTile"
import { AllDataResponse } from "../../api"
import  {ExternalLink, ExternalLinkBtn} from "../../components/link/Link"

const Grid = styled.div`
  display: grid;
  justify-content: center;
  width: 100%;
  grid-template-columns: repeat(auto-fill, minmax(200px, 400px));
  grid-gap: 20px;
`

const Tile = styled.div`
  position: relative;
  display: flex;
  flex-flow: column;
  align-items: center;
  padding: 26px 22px;
  border-radius: 4px;
  border: 1px solid ${theme.primary};

  ${XL}, ${X} {
    text-align: center;
  }

  & > *:nth-child(2) {
    margin: 24px 0 12px 0;
  }

  & > *:nth-child(4) {
    text-align: justify;
    display: block;
    margin: 18px 0 0 0;
  }
`

const Media = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: auto;
  padding: 32px 0 16px 0;

  & > *:not(:first-child) {
    margin-left: 24px;
  }

  a {
    cursor: pointer;

    &:hover {
      color: ${theme.primary};
    }
  }
`
const JoinUsLink = styled(ExternalLink)`
  ${ExternalLinkBtn}
`

interface ConnectedEmptyAuthorTileProps {
  discordUrl: string;
}


const ConnectedEmptyAuthorTile = ({discordUrl}: ConnectedEmptyAuthorTileProps) => {
  return (
    <EmptyAuthorTile joinUs={<JoinUsLink href={discordUrl} id="author-join-us">JOIN US !</JoinUsLink>} />
  )
}

interface AuthorsPageProps {
  pageContext: AllDataResponse
}

const AuthorsPage = ({
  pageContext: { authors, articles, site, translationObject, footerArticles },
}: AuthorsPageProps) => {
  const t = translationObject["en"]

  return (
    <SiteMeta
      siteName={site.siteName}
      siteLang={site.langs.en.html}
      gaPage={site.routes.authors.gaPage}
      url={site.routes.authors.to}
      robots="index,follow"
      title={`${site.siteName} authors: Meet our content creators and developers.`}
      type="website"
      image="/icon-192x192.png"
      description="Contact the blog authors and start writing."
    >
      <Layout articles={footerArticles} t={t} routes={site.routes} discordUrl={site.discordUrl}>
        <Content paddingY>
          <h1 style={{ visibility: "hidden", height: 0, margin: "0" }}>
            Platform authors and content creators
          </h1>
          <Grid>
            <ConnectedEmptyAuthorTile discordUrl={site.discordUrl}/>
            {authors.map(author => (
              <Tile key={author.id}>
                <AuthorAvatar size="medium" avatar={author.avatar} />
                <XL>
                  {author.firstName} {author.lastName}
                </XL>
                <X>{author.role}</X>
                <M>{author.bio}</M>
                <Media>
                  {author.githubURL && (
                    <a
                      href={author.githubURL}
                      title="Github profile"
                      target="_blank"
                    >
                      <GithubIcon />
                    </a>
                  )}
                  {author.linkedinURL && (
                    <a
                      href={author.linkedinURL}
                      title="Linkedin profile"
                      target="_blank"
                    >
                      <LinkedinIcon />
                    </a>
                  )}
                </Media>
              </Tile>
            ))}
          </Grid>
        </Content>
      </Layout>
    </SiteMeta>
  )
}

export type { AuthorsPageProps }

export default AuthorsPage
