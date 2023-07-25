import React from "react"
import { useScrollToTop } from "../../../utils/useScrollToTop"
import Layout from "../../containers/Layout"
import { Content, GithubIcon, LinkedinIcon } from "../../../ui"
import styled from "styled-components"
import AuthorAvatar from "../../../components/article/AuthorAvatar"
import { useAuthorsProvider } from "./AuthorsProvider"
import { EmptyAuthorTile } from "../../containers/EmptyAuthorTile"
import { AuthorTile } from "../../components/AuthorTile"

const Grid = styled.div`
  display: grid;
  justify-content: center;
  width: 100%;
  grid-template-columns: repeat(auto-fill, minmax(200px, 400px));
  grid-gap: 20px;
`

const AuthorsView = () => {
  useScrollToTop()
  const { authors, t } = useAuthorsProvider()

  return (
    <Layout>
      <Content paddingY>
        <h1 style={{ visibility: "hidden", height: 0, margin: "0" }}>
          {t.page_title}
        </h1>
        <Grid>
          <EmptyAuthorTile />
          {authors.map(author => (
            <AuthorTile
              key={author.id}
              bio={author.bio}
              role={author.role}
              fullName={author.full_name}
              avatar={<AuthorAvatar avatar={author.avatar} />}
              footer={
                <>
                  {author.github_url && (
                    <a
                      href={author.github_url}
                      title={t.my_github}
                      target="_blank"
                    >
                      <GithubIcon />
                    </a>
                  )}
                  {author.linkedin_url && (
                    <a
                      href={author.linkedin_url}
                      title={t.my_linkedin}
                      target="_blank"
                    >
                      <LinkedinIcon />
                    </a>
                  )}
                </>
              }
            />
          ))}
        </Grid>
      </Content>
    </Layout>
  )
}

export { AuthorsView }
