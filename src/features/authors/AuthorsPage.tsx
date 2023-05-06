import React, { useMemo, useState } from "react"
import { useJoinUsModal } from "../../components/article/WithJoinUsModal"
import Layout from "../../components/layout/Layout"
import { Content, GithubIcon, LinkedinIcon, M, X, XL } from "../../ui"
import { SiteMeta } from "../../utils/SiteMeta"
import AuthorAvatar from "../../components/article/AuthorAvatar"
import styled from "styled-components"
import theme from "../../utils/theme"
import { EmptyAuthorTile } from "../../components/empty-author-tile/EmptyAuthorTile"
import { AllDataResponse } from "../../api"
import {
  AuthorBadge,
  ContributorBadge,
} from "../../components/badges/CommunityBadges"
import Button from "../../components/button/Button"
import { Author } from "../../models"

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
const BadgesContainer = styled.div`
  position: absolute;
  right: 8px;
  top: 8px;
  display: flex;
  gap: 4px;
  & > * {
    width: 24px;
    height: 100%;
  }
`

const ControlsWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-bottom: 32px;
`

const ConnectedEmptyAuthorTile = () => {
  const ctx = useJoinUsModal()

  return <EmptyAuthorTile onClick={ctx.open} />
}

interface AuthorsPageProps {
  pageContext: AllDataResponse
}

interface FilterProps {
  isAuthor: boolean
  isContributor: boolean
}

const AuthorsPage = ({
  pageContext: { authors, articles, site, translationObject, footerArticles },
}: AuthorsPageProps) => {
  const t = translationObject["en"]
  const [filter, setFilter] = useState<FilterProps>({
    isAuthor: true,
    isContributor: true,
  })

  const filteredAuthors: Author[] = useMemo(() => {
    if (filter.isAuthor && filter.isContributor) {
      return authors
    }
    if (!filter.isAuthor && !filter.isContributor) {
      return []
    }
    return authors.filter(author => {
      return (
        (author.isAuthor && filter.isAuthor) ||
        (author.isContributor && filter.isContributor)
      )
    })
  }, [authors, filter])

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
      <Layout articles={footerArticles} t={t} routes={site.routes}>
        <Content paddingY>
          <h1 style={{ visibility: "hidden", height: 0, margin: "0" }}>
            Platform authors and content creators
          </h1>
          <ControlsWrapper>
            <Button
              active={filter.isAuthor}
              onClick={() =>
                setFilter({ ...filter, isAuthor: !filter.isAuthor })
              }
            >
              Authors
            </Button>
            <Button
              active={filter.isContributor}
              onClick={() =>
                setFilter({ ...filter, isContributor: !filter.isContributor })
              }
            >
              Contributors
            </Button>
          </ControlsWrapper>
          <Grid>
            <ConnectedEmptyAuthorTile />
            {filteredAuthors.map(author => (
              <Tile key={author.id}>
                <BadgesContainer>
                  {author.isAuthor && <AuthorBadge />}
                  {author.isContributor && <ContributorBadge />}
                </BadgesContainer>
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
