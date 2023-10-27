import React from "react"
import { useArticlePageProvider } from "../features/article/ArticlePageProvider"
import { useLayoutProvider } from "../providers/LayoutProvider"
import { Breadcrumbs } from "../components/Breadcrumbs"
import { Link } from 'gatsby'

const ArticleBreadcrumbs = () => {
    const { routes, t } = useLayoutProvider()
    const { title } = useArticlePageProvider()

    return (
        <Breadcrumbs>
            <Link to={routes.home.to}>{t.home}</Link>
            <Link to={routes.articles.to}>{t.articles}</Link>
            <span>{title}</span>
        </Breadcrumbs>
    )
}

export { ArticleBreadcrumbs }