import React from "react"

import type { HeadFC, PageProps } from "gatsby"

import { graphql } from "gatsby"

import { HeadMeta } from "../components/head-meta"

interface AuthorsPageProps {
  site: {
    siteMetadata: {
      url: string
      name: string
      description: string
      authors: any
    }
  }
}

const AuthorsPage: React.FC<PageProps<AuthorsPageProps>> = ({ data }) => {
  return <div>Content</div>
}

export default AuthorsPage

export const Head: HeadFC<AuthorsPageProps> = ({
  data: {
    site: {
      siteMetadata: { authors, ...meta },
    },
  },
}) => (
  <HeadMeta
    {...meta}
    robots="index,follow"
    title={`${meta.name} articles: Learn with us.`}
    description="Browse through our articles and find something suitable for you."
    type="website"
    lang=""
  />
)

export const query = graphql`
  query HomePageQuery {
    site {
      siteMetadata {
        url
        name
        description
        authors {
          id
          name
          firstName
          lastName
          role
          bio
          githubURL
          linkedinURL
        }
      }
    }
  }
`
