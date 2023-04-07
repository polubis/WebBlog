import React, { ReactNode } from "react"
import { Helmet } from "react-helmet"
import { useGAPage } from "./useGAPage"
import { SiteMetadata } from "../models"

interface SiteMetaProps extends Pick<SiteMetadata, "siteLang" | "siteName"> {
  url: string
  gaPage: string
  title: string
  description: string
  children: ReactNode
  type: "website" | "article"
  robots: string
  author?: string
  image?: string
}

export const SiteMeta = ({
  children,
  title,
  description,
  type,
  robots,
  author,
  url,
  gaPage,
  siteLang,
  siteName,
  image,
}: SiteMetaProps) => {
  useGAPage(gaPage)

  return (
    <>
      <Helmet htmlAttributes={{ lang: siteLang }}>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta name="parsely-title" content={title}></meta>
        <meta name="twitter:title" content={title}></meta>

        <meta name="description" content={description} />
        <meta property="og:description" content={description}></meta>
        <meta name="twitter:description" content={description}></meta>

        <meta property="og:site_name" content={siteName}></meta>

        <meta property="og:type" content={type}></meta>
        <meta name="robots" content={robots}></meta>

        <meta property="og:locale" content={siteLang}></meta>

        <meta property="og:url" content={url}></meta>
        <meta name="parsely-link" content={url}></meta>

        {image && <meta property="og:image" content={image}></meta>}
        {image && <meta property="og:image:secure_url" content={image}></meta>}
        {image && <meta name="msapplication-TileImage" content={image}></meta>}
        {image && <meta name="twitter:image" content={image}></meta>}
        {author && <meta name="author" content={author}></meta>}
      </Helmet>
      {children}
    </>
  )
}
