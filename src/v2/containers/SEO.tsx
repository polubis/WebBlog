import React from "react"
import { useLayoutProvider } from "../providers/LayoutProvider"
import type { SEOProps } from "../components/models"
import { SEO as SEOComponent } from "../components/SEO"

type SEOPartialProps = Omit<
  SEOProps,
  "site_name" | "lang" | "locale" | "locale_alternate"
>

const SEO = (props: SEOPartialProps) => {
  const layout = useLayoutProvider()

  return (
    <SEOComponent
      site_name={layout.site_name}
      lang={layout.lang.html}
      locale={layout.lang.locale}
      locale_alternate={layout.lang_alternate.locale}
      {...props}
    />
  )
}

export { SEO }
