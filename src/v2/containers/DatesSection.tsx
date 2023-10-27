import React, { useMemo } from "react"
import theme from "../../utils/theme"
import Badge from "../../components/article/Badge"
import { useLayoutProvider } from "../providers/LayoutProvider"
import { format } from "date-fns"
import styled from "styled-components"
import { SM_DOWN } from "../../utils/viewport"
import { useArticleProvider } from "../providers/ArticleProvider"

const Container = styled.div`
  display: grid;
  grid-template-columns: min-content min-content;
  grid-template-rows: auto;
  gap: 10px;

  @media ${SM_DOWN} {
    grid-template-columns: auto;
    grid-template-rows: auto auto;

    & > * {
      width: 100%;
    }
  }
`

const DatesSection = () => {
  const layout = useLayoutProvider()
  const { state: data } = useArticleProvider()

  const { creation, update } = useMemo(
    () => ({
      creation: format(new Date(data.cdate), "dd-MM-yyyy"),
      update: format(new Date(data.mdate), "dd-MM-yyyy"),
    }),
    [data.cdate, data.mdate]
  )

  return (
    <Container className="dates-section">
      <Badge className="tcenter" color={theme.secondary}>
        {layout.t.created}: {creation}
      </Badge>
      <Badge className="tcenter" color={theme.secondary}>
        {layout.t.updated}: {update}
      </Badge>
    </Container>
  )
}

export { DatesSection }
