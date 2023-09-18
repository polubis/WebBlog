import React from "react"
import { Helmet } from "react-helmet"
import type { SEOProps } from "./models"
import { useAnalytics } from "../../utils/useAnalytics"

const SEO = ({
  title,
  description,
  locale,
  lang,
  site_name,
  type,
  robots = "index,follow,max-image-preview:large",
  url,
  image,
  ga_page,
  children,
  author,
  locale_alternate,
}: SEOProps) => {
  useAnalytics(ga_page)

  return (
    <>
      <Helmet htmlAttributes={{ lang }}>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta name="parsely-title" content={title} />
        <meta name="twitter:title" content={title} />

        <meta name="description" content={description} />
        <meta property="og:description" content={description} />
        <meta name="twitter:description" content={description} />

        <meta property="og:site_name" content={site_name} />

        <meta property="og:type" content={type} />
        <meta name="robots" content={robots} />

        <meta property="og:locale" content={locale} />
        <meta property="og:locale:alternate" content={locale_alternate} />

        <meta property="og:url" content={url} />
        <meta name="parsely-link" content={url} />

        {image && <meta property="og:image" content={image} />}
        {image && <meta property="og:image:secure_url" content={image} />}
        {image && <meta name="msapplication-TileImage" content={image} />}
        {image && <meta name="twitter:image" content={image} />}
        {author && <meta name="author" content={author} />}
      </Helmet>
      {children}
    </>
  )
}

export { SEO }
