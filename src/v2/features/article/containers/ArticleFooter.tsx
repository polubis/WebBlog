import React, { useLayoutEffect } from "react"
import { M, XL } from "../../../../ui"
import { useLayoutProvider } from "../../../providers/LayoutProvider"
import { useArticleProvider } from "../ArticleProvider"
import { SM_DOWN } from "../../../../utils/viewport"
import { Link } from "gatsby"
import styled from "styled-components"
import { format } from "date-fns"
import theme from "../../../../utils/theme"
import Badge from "../../../../components/article/Badge"
import { NavigationSection } from "../../../components/NavigationSection"
import { isInSSR } from "../../../../utils/isInSSR"
import {
  article_comments_section_id,
  scroll_to_key,
} from "../../../core/consts"
import { ShareButton } from "../../../containers/ShareButton"
import { useAnalytics } from "../../../../utils/useAnalytics"

const Container = styled.div`
  .dates {
    margin: 32px 0 40px 0;

    & > * {
      margin: 0 10px 10px 0;

      @media ${SM_DOWN} {
        width: 100%;
        margin: 0 0 10px 0;
        text-align: center;
      }
    }
  }
`

const CommentsBox = () => {
  const layout = useLayoutProvider()

  useLayoutEffect(() => {
    if (isInSSR()) return

    const scrollTo = localStorage.getItem(scroll_to_key)

    if (!scrollTo) return

    const element = document.getElementById(scrollTo)

    if (!element) return

    const timeout = setTimeout(() => {
      element.scrollIntoView()
      localStorage.removeItem(scroll_to_key)
    }, 150)

    return () => {
      clearTimeout(timeout)
    }
  }, [])

  return (
    <div id={article_comments_section_id} className="section">
      <XL>{layout.t.comments.header}</XL>
      <M>{layout.t.comments.description}</M>
      <button title={layout.t.comments.open} className="upper button primary">
        {layout.t.loading}
      </button>
    </div>
  )
}

const ArticleFooter = () => {
  const layout = useLayoutProvider()
  const article = useArticleProvider()
  const { track } = useAnalytics()

  return (
    <Container>
      <div className="dates wrap">
        <Badge color={theme.secondary}>
          {layout.t.created}: {format(new Date(article.cdate), "dd-MM-yyyy")}
        </Badge>
        <Badge color={theme.secondary}>
          {layout.t.updated}: {format(new Date(article.mdate), "dd-MM-yyyy")}
        </Badge>
      </div>
      <NavigationSection>
        <ShareButton
          url={article.source_url + "/index.mdx"}
          link={article.url}
          title={article.title}
          description={article.description}
          time={article.read_time}
          tags={article.tags.split(',')}
          stack={article.technologies.map(technology => technology.id)}
          level={article.seniority}
        />
        <a
          href={article.source_url}
          className="button primary upper"
          target="_blank"
          onClick={() => track({ name: "article_source_clicked" })}
        >
          {layout.t.show_source}
        </a>

        {article.prev && (
          <Link to={article.prev.path} className="button primary upper">
            {layout.t.prev}
          </Link>
        )}

        {article.next && (
          <Link to={article.next.path} className="button primary upper">
            {layout.t.next}
          </Link>
        )}
      </NavigationSection>
    </Container>
  )
}

export { ArticleFooter }
