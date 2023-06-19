import React, { useState } from "react"
import styled from "styled-components"

import theme from "../../utils/theme"
import { L_UP, T_UP, M_UP } from "../../utils/viewport"
import Tile from "./Tile"
import { Article } from "../../models/Article"

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

interface Props {
  articles: Article[]
}

export default function ({ articles }: Props): React.ReactElement {
  return (
    <>
      <Grid>
        {articles.map(article => (
          <Tile key={article.slug} article={article} />
        ))}
      </Grid>
    </>
  )
}
