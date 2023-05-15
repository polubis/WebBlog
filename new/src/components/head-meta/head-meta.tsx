import type { HeadMetaProps } from "./defs"

import React from "react"

const HeadMeta = ({
    name,
    title,
    description,
    lang,
    robots,
    type,
    url,
}: HeadMetaProps) => (
    <>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta name="parsely-title" content={title}></meta>
        <meta name="twitter:title" content={title}></meta>

        <meta name="description" content={description} />
        <meta property="og:description" content={description}></meta>
        <meta name="twitter:description" content={description}></meta>

        <meta property="og:site_name" content={name}></meta>

        <meta property="og:type" content={type}></meta>
        <meta name="robots" content={robots}></meta>

        <meta property="og:locale" content={lang}></meta>

        <meta property="og:url" content={url}></meta>
        <meta name="parsely-link" content={url}></meta>
    </>
)

export { HeadMeta }
