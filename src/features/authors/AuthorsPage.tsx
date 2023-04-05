import React from "react"
import {
  WithJoinUsModal,
  useJoinUsModal,
} from "../../components/article/WithJoinUsModal"
import Layout from "../../components/layout/Layout"
import { Content, GithubIcon, LinkedinIcon, M, X, XL } from "../../ui"
import { SiteMeta } from "../../utils/SiteMeta"
import AuthorAvatar from "../../components/article/AuthorAvatar"
import styled from "styled-components"
import theme from "../../utils/theme"
import { EmptyAuthorTile } from "../../components/empty-author-tile/EmptyAuthorTile"
import { AllDataResponse } from "../../api/getAllData"

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

const ConnectedEmptyAuthorTile = () => {
  const ctx = useJoinUsModal()

  return <EmptyAuthorTile onClick={ctx.open} />
}

interface AuthorsPageProps {
  pageContext: AllDataResponse
}

const AuthorsPage = ({
  pageContext: { authors, articles },
}: AuthorsPageProps) => {
  return (
    <SiteMeta
      gaPage="authors"
      url="authors/"
      robots="index,follow"
      title="GreenOn Software blog authors"
      type="website"
      image="/icon-192x192.png"
      description="Contact the blog authors and start writing."
    >
      <WithJoinUsModal>
        <Layout articles={articles}>
          <Content paddingY>
            <Grid>
              <ConnectedEmptyAuthorTile />
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
      </WithJoinUsModal>
    </SiteMeta>
  )
}

export type { AuthorsPageProps }

export default AuthorsPage
