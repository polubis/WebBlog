import React, { ReactNode } from "react"
import { Article } from "../../models"
import { Footer, Layout } from "../../ui"
import { HomeNavigation } from "../home/HomeNavigation"

interface LayoutProps {
  children: ReactNode
  articles: Article[]
}

export default function ({ children, articles }: LayoutProps) {
  return (
    <Layout
      navigation={<HomeNavigation />}
      footer={<Footer articles={articles} />}
    >
      {children}
    </Layout>
  )
}

export { LayoutProps }
