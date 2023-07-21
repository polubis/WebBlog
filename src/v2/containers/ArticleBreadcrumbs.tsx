import React from "react"
import { useArticleProvider } from "../features/article/ArticleProvider"
import { useLayoutProvider } from "../providers/LayoutProvider"
import { Breadcrumbs } from "../components/Breadcrumbs"
import { Link } from 'gatsby'

const ArticleBreadcrumbs = () => {
    const { meta, t } = useLayoutProvider()
    const { article: { title } } = useArticleProvider()

    return (
        <Breadcrumbs>
            <Link to={meta.routes.home.to}>{t.home}</Link>
            <Link to={meta.routes.articles.to}>{t.articles}</Link>
            <span>{title}</span>
        </Breadcrumbs>
    )
}

export { ArticleBreadcrumbs }