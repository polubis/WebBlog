import React from "react"
import styled from "styled-components"
import { L_UP, M_UP, T_UP } from "../../../../utils/viewport"
import theme from "../../../../utils/theme"
import { useArticlesFiltersProvider } from "../ArticlesFiltersProvider"
import { M, XL } from "../../../../ui"
import { Link } from "gatsby"
import Badge from "../../../../components/article/Badge"
import Button from "../../../../components/button/Button"
import { useArticlesPageProvider } from "../ArticlesPageProvider"
import { Seniority } from "../../../core/models"
import AuthorAvatar from "../../../../components/article/AuthorAvatar"
import { useLayoutProvider } from "../../../providers/LayoutProvider"
import { Tags } from "../../../components/Tags"
import { ReadTime } from "../../../components/ReadTime"

const Grid = styled.div`
  display: grid;
  grid-template-rows: auto;
  justify-content: center;
  grid-gap: 62px;
  box-sizing: border-box;

  @media ${M_UP} {
    grid-template-columns: minmax(320px, auto);
  }

  @media ${T_UP} {
    grid-template-columns: minmax(320px, 450px) minmax(320px, 450px);
  }

  @media ${L_UP} {
    grid-template-columns: 422px 422px 422px;
  }

  & > * {
    @media ${L_UP} {
      padding: 0 52px;
    }

    &::after,
    &::before {
      position: absolute;
      height: 128px;
      width: 1px;
      background: ${theme.primary};
    }

    &::after {
      top: 0;
      right: 0;
    }

    &::before {
      bottom: 0;
      left: 0;
    }

    @media ${L_UP} {
      &:nth-of-type(3n) {
        &::before {
          content: "";
        }
      }

      &:first-of-type,
      &:nth-of-type(3n + 4) {
        &::after {
          content: "";
        }
      }

      &:nth-of-type(3n + 2) {
        &::after,
        &::before {
          content: "";
        }
      }
    }
  }
`

const Tile = styled.div`
  position: relative;
  box-sizing: border-box;

  & > a {
    margin: 0 auto 0 0;
    text-decoration: none;
  }

  & > a:hover,
  & > a:active {
    text-decoration: underline ${theme.primary};
  }

  ${XL} {
    margin: 10px 0 24px 0;
  }

  ${M} {
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .tile-details {
    margin: 28px 0 42px 0;

    & > :nth-child(2) {
      margin: 0 20px 0 20px;
    }
  }
`

const ArticlesGrid = () => {
  const { routes, t: layoutT } = useLayoutProvider()
  const { filteredArticles } = useArticlesFiltersProvider()
  const { t: articlesPageT } = useArticlesPageProvider()
  const readArticleText = articlesPageT.read_article
  const newText = articlesPageT.new

  return (
    <Grid>
      {filteredArticles.map(
        ({
          tags,
          path,
          seniority,
          title,
          description,
          author,
          duration,
          is_new,
        }) => (
          <Tile key={title} className="col">
            <Tags>
              {tags.map(tag => (
                <h6 key={tag}>{tag}</h6>
              ))}
            </Tags>
            <Link to={path}>
              <XL>
                <span title={layoutT[seniority]}>{Seniority[seniority]}</span>
                {title}
              </XL>
            </Link>
            <M normal>{description}</M>

            <div className="tile-details row">
              <Link to={routes.authors.to}>
                <AuthorAvatar
                  avatar={author.avatar.small}
                  avatarTitle={author.full_name}
                />
              </Link>
              <ReadTime time={duration} />
              {is_new && <Badge color={theme.green}>{newText}</Badge>}
            </div>
            <Link to={path}>
              <Button>{readArticleText}</Button>
            </Link>
          </Tile>
        )
      )}
    </Grid>
  )
}

export { ArticlesGrid }
