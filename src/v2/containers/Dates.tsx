import React from "react"
import Badge from "../../components/article/Badge"
import theme from "../../utils/theme"
import { format } from "date-fns"
import { useArticleProvider } from "../features/article/ArticleProvider"
import styled from "styled-components"
import { SM_DOWN } from "../../utils/viewport"

const Container = styled.div`
    & > * {
      margin: 0 10px 10px 0;

      @media ${SM_DOWN} {
        width: 100%;
        margin: 0 0 10px 0;
        text-align: center;
      }
    }
`

const Dates = () => {
    const article = useArticleProvider()

    return (
        <Container className="dates wrap">
            <Badge color={theme.secondary}>
                {article.t.created}:{" "}
                {format(new Date(article.cdate), 'dd-MM-yyyy')}
            </Badge>
            <Badge color={theme.secondary}>
                {article.t.updated}:{" "}
                {format(new Date(article.mdate), 'dd-MM-yyyy')}
            </Badge>
        </Container>
    )
}

export { Dates }
