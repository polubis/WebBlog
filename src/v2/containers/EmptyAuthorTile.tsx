import React from "react"
import styled from "styled-components"
import theme from "../../utils/theme"
import Button from "../../components/button/Button"
import { PersonAddIcon } from "../../ui/icons/PersonAddIcon"
import { useLayoutProvider } from "../providers/LayoutProvider"
import { useAuthorsProvider } from "../features/authors/AuthorsProvider"
import { AuthorTile } from "../components/AuthorTile"

const Avatar = styled.div`
  height: 92px;
  width: 92px;
  background: ${theme.secondary};

  svg {
    height: 42px;
    width: 42px;
  }

  path {
    fill: ${theme.black};
  }
`

export const EmptyAuthorTile = () => {
  const layout = useLayoutProvider()
  const authors = useAuthorsProvider()

  return (
    <AuthorTile
      avatar={
        <Avatar className="center circle">
          <PersonAddIcon />
        </Avatar>
      }
      fullName={authors.t.you_can_be_here}
      role={authors.t.articles_creator}
      bio={authors.t.articles_creator_description}
      footer={
        <a
          href={layout.discord_url}
          title={layout.t.discord_channel}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button>{authors.t.join_us}</Button>
        </a>
      }
    />
  )
}
